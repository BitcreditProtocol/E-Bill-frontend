import React, { useEffect, useMemo, useState } from "react";
import { Input, type InputProps } from "./ui/input";
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { SearchResult } from "leaflet-geosearch/dist/providers/provider.js";
import { RawResult } from "leaflet-geosearch/dist/providers/openStreetMapProvider.js";
import { useLanguage } from "@/context/language/LanguageContext";

export type GeoInputProps = InputProps

const GeoInput = (props : GeoInputProps) => {
  const { locale } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult<RawResult>[]>();
  const provider = useMemo(() => {
    return new OpenStreetMapProvider({
      params: {
        'accept-language': locale,
        layer: 'address'
      },
    });
  }, [locale]);

  useEffect(() => {
    const search = async (query: string) => provider.search({ query });

    const timerId = setTimeout(() => {
      search(searchTerm).then((results) => {
        setResults(results);
      }).catch(() => {
        setResults([]);
      })
    }, 1_000);

    return () => { clearTimeout(timerId) };
  }, [provider, searchTerm]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  return (<Input
    {...props}
    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);

      if (props.onChange) {
        props.onChange(event);
      }
    }}
  />);
};

GeoInput.displayName = "GeoInput";

export { GeoInput };
