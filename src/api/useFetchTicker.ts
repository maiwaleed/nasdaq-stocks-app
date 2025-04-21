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
  } catch (error) {
    console.error(error);
    throw new Error(`Request setup error: ${error}`);
  }
};

const useFetchTicker = () => {
  const query = useSearchStore((store) => store.query);

  const {
    data: tickerData,
    fetchNextPage,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["tickers"],
    queryFn: fetchData,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.next_url ?? undefined,
    enabled: !query,
    staleTime: Infinity,
  });

  return {
    data: tickerData?.pages,
    fetchNextPage,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
  };
};

export default useFetchTicker;
