import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useSearchStore } from "@/store/searchStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";
import useSearchTicker from "@/api/useSearchTicker";

const SearchInput = () => {
  const query = useSearchStore((store) => store.query);
  const setQuery = useSearchStore((store) => store.setQuery);
  const clearQuery = useSearchStore((store) => store.clearQuery);

  const { searchResult } = useSearchTicker(query);
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    setInputValue(query);
    console.log(searchResult);
  }, [query]);

  const debouncedSetQuery = useMemo(
    () =>
      debounce((val: string) => {
        return setQuery(val.toUpperCase());
      }, 500),
    [setQuery]
  );

  useEffect(() => {
    debouncedSetQuery(inputValue);
    return () => debouncedSetQuery.cancel();
  }, [inputValue, debouncedSetQuery]);

  return (
    <div className="flex items-center justify-center gap-0.5  w-[30%] mx-auto relative">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search stocks..."
        className="transition-all"
      />

      <Search size={16} className="h-5 w-5 absolute right-5" />
    </div>
  );
};

export default SearchInput;
