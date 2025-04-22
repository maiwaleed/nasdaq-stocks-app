import { useSearchStore } from "@/store/searchStore";
import { FetchedTickers } from "@/types/tickers";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const Api_key = import.meta.env.VITE_API_KEY;

export const fetchData = async ({ pageParam }: { pageParam?: string }) => {
  try {
    const url =
      pageParam ??
      `https://api.polygon.io/v3/reference/tickers?apiKey=${Api_key}`;
    const response = await axios.get<FetchedTickers>(url, {
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

const useFetchTicker = () => {
  const query = useSearchStore((store) => store.query);

  const {
    data: tickerData,
    fetchNextPage,
    isLoading,
    isError,
    error: fetchError,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tickers"],
    queryFn: fetchData,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next_url ?? undefined,
    enabled: !query,
    retry: (failureCount, error: any) => {
      return error?.code === 429 && failureCount < 2;
    },

    retryDelay: (error: any) => {
      if (error?.code === 429) {
        return error.retryAfter || 60_000;
      }
      return 60000;
    },
    staleTime: Infinity,
  });

  return {
    data: tickerData?.pages,
    fetchNextPage,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchError,
  };
};

export default useFetchTicker;
