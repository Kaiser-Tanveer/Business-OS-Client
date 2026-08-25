import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
}: SearchBarProps) => {
  const [internalValue, setInternalValue] = useState("");

  const searchValue = value ?? internalValue;

  const handleChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
  };

  const clearSearch = () => {
    handleChange("");
  };

  return (
    <div className="relative w-full sm:max-w-sm">
      <Search
        size={18}
        className="
          pointer-events-none
          absolute left-3 top-1/2
          -translate-y-1/2
          text-slate-400
        "
      />

      <input
        type="text"
        value={searchValue}
        onChange={(event) =>
          handleChange(event.target.value)
        }
        placeholder={placeholder}
        className="
          h-10 w-full
          rounded-lg
          border
          border-slate-300
          bg-white
          pl-10 pr-10
          text-sm
          text-slate-900
          outline-none
          transition

          placeholder:text-slate-400

          focus:border-indigo-500
          focus:ring-2
          focus:ring-indigo-500/20

          dark:border-slate-700
          dark:bg-slate-900
          dark:text-white
          dark:placeholder:text-slate-500
        "
      />

      {searchValue && (
        <button
          type="button"
          onClick={clearSearch}
          className="
            absolute right-3 top-1/2
            -translate-y-1/2
            text-slate-400
            hover:text-slate-700
            dark:hover:text-white
          "
          aria-label="Clear search"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;