import {Time} from "lightweight-charts";

export interface StockSymbol {
  symbol: string;
  name: string;
  category: string;
  exchange: string;
}

export interface StockInfo extends StockSymbol {
  price: number;
  change: number;
}

export interface Stock {
  symbol: string;
  name: string;
  prices: StockPrice[];
}

export interface StockPrice {
  open: number;
  close: number;
  low: number;
  high: number;
  time: Time;
}