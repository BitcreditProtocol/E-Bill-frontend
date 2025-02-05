import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { truncateAvatarName } from "@/utils/strings";
import { cva, VariantProps } from "class-variance-authority";

const avatarVariants = cva("bg-brand-50 flex items-center justify-center", {
  variants: {
    size: {
      // todo: only add padding if there is no image
      // md: "w-10 h-10 px-[9px] py-[8px] text-[16px]",
      // lg: "w-16 h-16 px-[13px] py-[16px] text-[24px]",
      md: "w-10 h-10 text-[16px]",
      lg: "w-16 h-16 text-[24px]",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type IdentityAvatarProps = {
  name: string;
  picture: string;
  identityType: "personal" | "company" | null;
} & VariantProps<typeof avatarVariants>;

export default function IdentityAvatar({
  name,
  picture,
  identityType = "personal",
  size,
}: IdentityAvatarProps) {
  const displayedName = truncateAvatarName(name);

  return (
    <Avatar
      className={cn(
        avatarVariants({ size }),
        identityType === "personal" ? "rounded-full" : "rounded-lg"
      )}
    >
      <AvatarImage src={picture} alt={name} />
      <AvatarFallback className="bg-brand-50 text-brand-200 font-medium">
        {displayedName}
      </AvatarFallback>
    </Avatar>
  );
}
