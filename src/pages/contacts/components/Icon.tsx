import type { Contact } from "@/types/contact";
import { useLanguage } from "@/context/language/LanguageContext";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface IconProps {  
  type: Contact["type"];
  name: Contact["name"];
}

export default function Icon({ name, type }: IconProps) {
  const lang = useLanguage();

  return (
    <Avatar className={cn("bg-brand-50 relative", {
      "rounded-full": type === 0,
      "rounded-md": type !== 0,
    })}>
      <AvatarImage src="https://randomuser.me/api/portraits" />
      <AvatarFallback className="bg-brand-50 text-brand-200 text-[20px] font-medium">
        {name.charAt(0).toLocaleUpperCase(lang.locale) || '?'}
      </AvatarFallback>
    </Avatar>
  );
}