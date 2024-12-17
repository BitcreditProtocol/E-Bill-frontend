import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";

import routes from "@/constants/routes";
import type { Contact } from "@/types/contact";
import { useLanguage } from "@/context/language/LanguageContext";
import Icon from "./Icon";

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
        <Icon type={value.type} name={value.name} />

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

type Category = string;

const sortContacts = (values: Contact[], locale: string): Record<Category, Contact[]> => {
  return [...values]
    .sort((a, b) => a.name.localeCompare(b.name, locale))
    .map((it) => {
      const firstChar: Category = it.name.charAt(0).toLocaleUpperCase(locale);
      return { category: firstChar, value: it };
    })
    .reduce<Record<Category, Contact[]>>((acc, item) => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      acc[item.category] = acc[item.category] || [];
      acc[item.category].push(item.value);
      return acc;
    }, {});
}

export interface ListProps {
  values: Contact[];
}

export default function List({ values }: ListProps) {
  const lang = useLanguage();
  const valuesMap = useMemo(() => sortContacts(values, lang.locale), [values, lang.locale]);
  const categories = useMemo<Category[]>(() => {
    return Object.keys(valuesMap).sort((a, b) => a.localeCompare(b, lang.locale));
  }, [valuesMap, lang.locale]);

  return (
    <div className="flex flex-col gap-3 w-full" data-testid="contact-list-container">
      {categories.map((category) => (<div key={category} data-testid={`contact-category-container-${category}`}>
        <div className="text-text-300 text-xs ps-5 mb-3 font-medium" data-testid={`contact-category-title-${category}`}>{category}</div>
        <div className="flex flex-col gap-2" data-testid={`contact-category-items-${category}`}>
          {valuesMap[category].map((value, valueIndex) => (
            <Contact key={valueIndex} value={value} />
          ))}
        </div>
      </div>))}
    </div>
  );
}
