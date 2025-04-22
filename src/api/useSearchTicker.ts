import axios from "axios";
import { SearchResultData } from "@/types/tickers";
import { useInfiniteQuery } from "@tanstack/react-query";
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
  } catch (error: any) {
    if (error.response?.status === 429) {
      const errorMessage = error.response.data?.error;

      if (
        errorMessage &&
        errorMessage.includes("exceeded the maximum requests per minute")
      ) {
        console.error(`Rate limit exceeded. Retry after one minute.`);
        throw new Error(
          `Rate limit exceeded. Please wait for one minute before retrying.`
        );
      }
    }

    console.error(error);
    throw new Error(`Request failed: ${error.message || "Unknown error"}`);
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
    error: searchError,
  } = useInfiniteQuery({
    queryKey: ["searchResult", query],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      searchTicker({ query, pageParam }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next_url ?? undefined,
    enabled: !!query && query.length >= 1,
    retry: (failureCount, error: any) => {
      return error?.code === 429 && failureCount < 2;
    },

    retryDelay: (error: any) => {
      if (error?.code === 429) {
        return error.retryAfter || 60_000;
      }
      return 60000;
    },
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
    searchError,
  };
};

export default useSearchTicker;
