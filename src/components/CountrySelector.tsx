import { useMemo } from "react";
import { EarthIcon } from "lucide-react";
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
  value,
  callback,
  required,
}: {
  label: string;
  value?: string;
  callback: (value: string) => void;
  required?: boolean;
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
      value={value}
      required={required}
    >
      <SelectTrigger
        icon={<EarthIcon className="text-text-300 h-5 w-5 stroke-1" />}
        label={label}
      >
        <SelectValue className="!text-red-200" placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-[10rem]">
          <SelectGroup>{renderCountriesList}</SelectGroup>
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
