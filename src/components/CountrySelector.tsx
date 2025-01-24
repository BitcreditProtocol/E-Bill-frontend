import { useMemo } from "react";
import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { COUNTRIES } from "@/constants/countries";

export default function CountrySelector({
  label,
  callback,
}: {
  label: string;
  callback: (value: string) => void;
}) {
  const renderCountriesList = useMemo(
    () =>
      Object.entries(COUNTRIES).map(([code, country]) => (
        <SelectItem key={code} value={code}>
          {country}
        </SelectItem>
      )),
    []
  );

  return (
    <Select
      onValueChange={(value) => {
        callback(value);
      }}
    >
      <SelectTrigger label={label}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-[10rem]">
          <SelectGroup>{renderCountriesList}</SelectGroup>
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
