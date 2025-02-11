import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { truncateAvatarName } from "@/utils/strings";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const pictureVariants = cva(
  "flex flex-col items-center justify-center bg-brand-100 text-brand-200",
  {
    variants: {
      size: {
        sm: "py-1.5 px-3 h-8 w-8 text-sm font-medium leading-5",
        md: "h-10 w-10 text-base font-medium leading-6",
        lg: "h-16 w-16 text-2xl font-medium leading-8",
      },
      type: {
        personal: "rounded-full",
        company: "rounded-md",
      },
    },
    defaultVariants: {
      size: "md",
      type: "personal",
    },
  }
);

type PictureProps = {
  type: number;
  name: string;
  image: string;
  size?: "sm" | "md" | "lg";
};

export default function Picture({ type, name, image, size }: PictureProps) {
  const avatarType = type === 0 ? "personal" : "company";

  return (
    <Avatar
      className={cn(
        { "!p-0": image !== "" },
        pictureVariants({ type: avatarType, size })
      )}
    >
      <AvatarImage className="object-fit" src={image} alt={name} />
      <AvatarFallback
        className={cn(pictureVariants({ type: avatarType, size }))}
      >
        {truncateAvatarName(name)}
      </AvatarFallback>
    </Avatar>
  );
}
