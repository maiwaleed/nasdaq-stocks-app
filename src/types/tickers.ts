export interface FetchedTickers {
  results: TickerObject[];
  status: string;
  request_id: string;
  count: number;
  next_url: string;
}

export interface TickerObject {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  primary_exchange?: string;
  type: string;
  active: boolean;
  currency_name: string;
  cik?: string;
  composite_figi?: string;
  share_class_figi?: string;
  last_updated_utc: string;
}

export interface FetchedSearch {
  data: SearchResultData;
  status: number;
  statusText: string;
}

export interface SearchResultData {
  results: TickerObject[];
  status: string;
  request_id: string;
  count: number;
  next_url: string;
}
