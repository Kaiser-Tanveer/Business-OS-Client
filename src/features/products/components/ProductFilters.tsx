import SearchBar from "../../../components/common/SearchBar";

interface ProductFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const ProductFilters = ({
  search,
  onSearchChange,
}: ProductFiltersProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <SearchBar
        value={search}
        onChange={onSearchChange}
        placeholder="Search products..."
      />

      <div className="flex gap-2">
        <select
          className="
            h-10
            rounded-lg
            border
            border-slate-300
            bg-white
            px-3
            text-sm
            text-slate-700
            outline-none

            focus:border-indigo-500

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
          "
          defaultValue="all"
        >
          <option value="all">
            All Categories
          </option>

          <option value="grocery">
            Grocery
          </option>
        </select>

        <select
          className="
            h-10
            rounded-lg
            border
            border-slate-300
            bg-white
            px-3
            text-sm
            text-slate-700
            outline-none

            focus:border-indigo-500

            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-300
          "
          defaultValue="all"
        >
          <option value="all">
            All Status
          </option>

          <option value="active">
            Active
          </option>

          <option value="inactive">
            Inactive
          </option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;