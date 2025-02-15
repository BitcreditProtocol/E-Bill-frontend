import type { Contact } from "@/types/contact";
import { ContactTypes } from "@/types/contact";
import { useLanguage } from "@/context/language/LanguageContext";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type IconProps = Pick<Contact, 'type' | 'name'> & {
  src?: string
  className?: string;
};

export default function Icon({ name, type, src, className }: IconProps) {
  const lang = useLanguage();

  return (
    <Avatar className={cn("bg-brand-50 relative", {
      "rounded-full": type === ContactTypes.Person,
      "rounded-md": type !== ContactTypes.Person,
    }, className)}>
      <AvatarImage src={src} alt="name" />
      <AvatarFallback className="bg-brand-50 text-brand-200 text-[20px] font-medium">
        {name.charAt(0).toLocaleUpperCase(lang.locale) || '?'}
      </AvatarFallback>
    </Avatar>
  );
}
