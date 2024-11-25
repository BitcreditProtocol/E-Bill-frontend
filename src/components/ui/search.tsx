import { SearchIcon } from "lucide-react";
import { useRef } from "react";
import { useIntl } from "react-intl";

interface SearchProps {
  onSearch: (query: string) => void;
  placeholder: string;
  size?: "xs" | "sm" | "md" | "lg";
}

const sizeClasses = {
  xs: "p-2 text-xs",
  sm: "px-4 py-3 text-sm",
  md: "p-4 text-sm",
  lg: "px-4 py-5 text-sm",
};

function Search({ onSearch, placeholder, size = "md" }: SearchProps) {
  const intl = useIntl();
  const searchFieldRef = useRef<HTMLInputElement>(null);

  const focusSearchField = () => {
    searchFieldRef.current?.focus();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearch(searchFieldRef.current?.value || "");
    }
  };

  return (
    <div
      onClick={focusSearchField}
      className={`flex items-center gap-2 bg-elevation-50 border-[1px] border-divider-75 rounded-[8px] ${sizeClasses[size]} hover:bg-elevation-250 hover:border-divider-50 focus-within:bg-elevation-250 focus-within:border-divider-300 transition-all ease-in-out duration-200`}
    >
      <SearchIcon
        className={`${size === "xs" ? "h-4 w-4" : "h-5 w-5"} text-text-300`}
      />

      <input
        ref={searchFieldRef}
        type="text"
        placeholder={
          placeholder ||
          intl.formatMessage({
            id: "contacts.search.placeholder",
            defaultMessage: "Search for contacts...",
            description: "Placeholder text for search input",
          })
        }
        className="w-full text-text-300 bg-transparent font-medium placeholder-text-300 focus:outline-none"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default Search;
