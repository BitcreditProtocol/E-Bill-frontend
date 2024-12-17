import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";

import routes from "@/constants/routes";
import type { Contact } from "@/types/contact";
import { useMemo } from "react";

interface ContactProps {  
  value: Contact;
}

function Contact({ value }: ContactProps) {
  const navigate = useNavigate();
  const goToContact = () => {
    navigate(`${routes.VIEW_CONTACT}/${value.public_key}`);
  };

  return (
    <div
      className="flex items-center justify-between py-4 px-3 w-full border-[1px] border-divider-75 rounded-xl cursor-pointer select-none"
      onClick={goToContact}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 py-1.5 px-2.5 bg-brand-50 text-brand-200 rounded-full">
          T
        </div>

        <div className="flex flex-col">
          <span className="text-text-300 text-base font-medium">
            {value.name}
          </span>
          <span className="text-text-200 text-xs">
            {value.postal_address}
          </span>
        </div>
      </div>
      <ChevronRightIcon className="w-6 h-6 text-brand-200" strokeWidth={1} />
    </div>
  );
}

interface ListProps {
  values: Contact[];
}

export default function List({ values }: ListProps) {
  const valuesMap = useMemo(() => {
    const map: Record<string, Contact[]> = {};
    values.forEach((it) => {
      const firstChar = it.name.charAt(0);
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      map[firstChar] = map[firstChar] || [];
      map[firstChar].push(it);
    });
    return map;
  }, [values]);

  return (
    <div className="flex flex-col gap-2 w-full">
      {Object.entries(valuesMap).map(([category, values], categoryIndex) => (
        <div key={categoryIndex}>
          <div>{category}</div>
          {values.map((value, valueIndex) => (
            <Contact key={valueIndex} value={value} />
          ))}
      </div>))}
    </div>
  );
}
