import axios from "axios";
import {
  FetchedSearch,
  FetchedTickers,
  SearchResultData,
} from "@/types/tickers";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useSearchStore } from "@/store/searchStore";
import { useEffect } from "react";

const Api_key = import.meta.env.VITE_API_KEY;

const searchTicker = async ({
  query,
  pageParam,
}: {
  query: string;
  pageParam?: string;
}): Promise<SearchResultData> => {
  try {
    const url =
      pageParam ||
      `https://api.polygon.io/v3/reference/tickers?market=stocks&search=${query}&active=true&order=asc&sort=ticker&apiKey=${Api_key}`;

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Api_key}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Request setup error: ${error}`);
  }
};

const useSearchTicker = (query: string) => {
  const setSearchedList = useSearchStore((store) => store.setSearchedList);

  //query !== "" && searchedList.length === 0
  const {
    data: searchResult,
    isPending,
    isError,
    refetch,
    hasNextPage: searchHasNextPage,
    isFetchingNextPage: isFetchingSearchNextPage,
    fetchNextPage: fetchNextSearchPage,
  } = useInfiniteQuery({
    queryKey: ["searchResult", query],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      searchTicker({ query, pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next_url ?? undefined,
    enabled: !!query && query.length >= 1,
  });
  useEffect(() => {
    if (searchResult && searchResult?.pages) {
      setSearchedList(searchResult.pages.flatMap((page) => page.results) || []);
    }
  }, [searchResult]);
  return {
    searchResult: searchResult?.pages.flatMap((page) => page.results) || [],
    isPending,
    isError,
    refetch,
    searchHasNextPage,
    isFetchingSearchNextPage,
    fetchNextSearchPage,
  };
};

export default useSearchTicker;
