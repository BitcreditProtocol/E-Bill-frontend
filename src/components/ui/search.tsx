import { SearchIcon } from "lucide-react";
import { useRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const searchVariants = cva(
  "flex items-center gap-2 bg-elevation-50 border-[1px] border-divider-75 rounded-[8px] transition-all ease-in-out duration-200    hover:bg-elevation-250 hover:border-divider-50 focus-within:bg-elevation-250 focus-within:border-divider-300",
  {
    variants: {
      size: {
        xs: "p-2 text-xs",
        sm: "px-4 py-3 text-sm",
        md: "p-4 text-sm",
        lg: "px-4 py-5 text-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

function Search({ onSearch, placeholder, size }: SearchProps) {
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const focusSearchField = () => {
    searchFieldRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchFieldRef.current?.value) {
      onSearch(searchFieldRef.current.value);
    }
  };

  return (
    <div onClick={focusSearchField} className={cn(searchVariants({ size }))}>
      <SearchIcon
        className={`${size === "xs" ? "h-4 w-4" : "h-5 w-5"} text-text-300`}
      />

      <input
        ref={searchFieldRef}
        type="text"
        placeholder={
          placeholder
        }
        className="w-full text-text-300 bg-transparent font-medium placeholder-text-300 focus:outline-none"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Search;
