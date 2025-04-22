import Loading from "@/components/Loading";
import useFetchTicker from "../api/useFetchTicker";
import StockCard from "@/components/stock-card";
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Error from "@/components/Error";
import useSearchTicker from "@/api/useSearchTicker";
import { useSearchStore } from "@/store/searchStore";
import { TickerObject } from "@/types/tickers";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const ExploreScreen = () => {
  const query = useSearchStore((store) => store.query);
  const searchedList = useSearchStore((store) => store.searchedList);
  const setFetchedDataList = useSearchStore(
    (store) => store.setFetchedDataList
  );

  const {
    data: stockInfo = [],
    isError: isTickerError,
    hasNextPage,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    fetchError,
  } = useFetchTicker();

  const {
    isPending: isSearchResultLoading,
    isError: isSearchResultError,
    searchError,
  } = useSearchTicker(query);

  const navigate = useNavigate();
  const infiniteScrollRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !hasNextPage) return;
      if (query.length > 0) return;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      observer.observe(node);

      return () => observer.disconnect();
    },
    [hasNextPage, fetchNextPage, query]
  );
  const renderedList = useMemo(() => {
    if (query && searchedList) {
      return searchedList;
    }
    setFetchedDataList(stockInfo.flatMap((page) => page.results) || []);
    return stockInfo.flatMap((page) => page.results) || [];
  }, [stockInfo, query, searchedList]);

  const handleClick = useCallback((stock: TickerObject) => {
    navigate(`/stock/${stock.ticker}`, { state: { stock } });
  }, []);

  if (isLoading) return <Loading />;
  if (isTickerError) return <Error message={fetchError?.message} />;

  if (query && isSearchResultLoading) return <Loading />;
  if (query && isSearchResultError) {
    return <Error message={searchError.message} />;
  }
  if (query && searchedList.length === 0) {
    return <Error message="No results found!" />;
  }
  return (
    <>
      <div className="p-4 md:p-6 flex flex-wrap justify-center mb-6 gap-4">
        {renderedList.map((stock, i) => (
          <div key={i} className="w-full sm:w-1/2 md:w-1/3 lg:w-[24%]">
            <StockCard
              ticker={stock.ticker}
              name={stock.name}
              width="100%"
              onClick={() => handleClick(stock)}
            />
          </div>
        ))}
      </div>
      {hasNextPage && <div ref={infiniteScrollRef} className="w-full h-8" />}

      {isFetchingNextPage && <Loading />}
      <ScrollToTopButton />
    </>
  );
};

export default ExploreScreen;
