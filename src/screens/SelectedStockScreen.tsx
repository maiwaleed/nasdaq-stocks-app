import { useSearchStore } from "@/store/searchStore";
import { TickerObject } from "@/types/tickers";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface StockDetails {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  type: string;
  active: boolean;
  currency_name: string;
  composite_figi: string;
  share_class_figi: string;
  last_updated_utc: string;
}

const SelectedStockScreen = () => {
  const location = useLocation();
  const stockDetails: TickerObject = location.state?.stock;
  const clearQuery = useSearchStore((store) => store.clearQuery);

  useEffect(() => {
    clearQuery();
  }, []);

  if (!stockDetails) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        No stock details to display.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {stockDetails.name}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Ticker: {stockDetails.ticker}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white shadow-md rounded-xl p-4">
          <p className="text-gray-700 font-semibold">Market:</p>
          <p className="text-gray-900">{stockDetails.market.toUpperCase()}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <p className="text-gray-700 font-semibold">Type:</p>
          <p className="text-gray-900">{stockDetails.type}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <p className="text-gray-700 font-semibold">Currency:</p>
          <p className="text-gray-900">{stockDetails.currency_name}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <p className="text-gray-700 font-semibold">Locale:</p>
          <p className="text-gray-900">{stockDetails.locale.toUpperCase()}</p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4 col-span-full">
          <p className="text-gray-700 font-semibold">FIGI:</p>
          <p className="text-gray-900 break-all">
            {stockDetails.composite_figi}
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Share Class FIGI: {stockDetails.share_class_figi}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <p className="text-gray-700 font-semibold">Active:</p>
          <p
            className={`font-bold ${
              stockDetails.active ? "text-green-600" : "text-red-600"
            }`}
          >
            {stockDetails.active ? "Yes" : "No"}
          </p>
        </div>

        <div className="bg-white shadow-md rounded-xl p-4">
          <p className="text-gray-700 font-semibold">Last Updated:</p>
          <p className="text-gray-900">
            {new Date(stockDetails.last_updated_utc).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectedStockScreen;
