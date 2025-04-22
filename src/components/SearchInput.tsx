import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useSearchStore } from "@/store/searchStore";
import debounce from "lodash.debounce";
import useSearchTicker from "@/api/useSearchTicker";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const query = useSearchStore((store) => store.query);
  const setQuery = useSearchStore((store) => store.setQuery);
  const clearQuery = useSearchStore((store) => store.clearQuery);
  const searchedList = useSearchStore((store) => store.searchedList);
  const navigate = useNavigate();

  const { searchResult } = useSearchTicker(query);

  const [inputValue, setInputValue] = useState(query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    navigate(`/explore`);
  };

  useEffect(() => {
    setInputValue(query);
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
        onChange={handleChange}
        placeholder="Search stocks..."
        className="transition-all"
      />

      {query.length ? (
        <X
          size={16}
          className="h-5 w-5 absolute right-5 cursor-pointer"
          onClick={() => setQuery("")}
        />
      ) : (
        <Search size={16} className="h-5 w-5 absolute right-5" />
      )}
    </div>
  );
};

export default SearchInput;
