import { TickerObject } from "@/types/tickers";
import { create } from "zustand";

interface SearchState {
  query: string;
  setQuery: (query: string) => void;
  clearQuery: () => void;
  fetchedDataList: TickerObject[];
  setFetchedDataList: (fetchedDataList: TickerObject[]) => void;
  searchedList: TickerObject[];
  setSearchedList: (searchedList: TickerObject[]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
  clearQuery: () => set({ query: "" }),
  fetchedDataList: [],
  setFetchedDataList: (fetchedDataList) => {
    set({ fetchedDataList });
  },
  searchedList: [],
  setSearchedList: (searchedList) => {
    set({ searchedList });
  },
}));
