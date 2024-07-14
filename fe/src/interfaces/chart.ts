import {IChartApi, ISeriesApi, SeriesType} from "../lib";

export interface IChartApiRef {
  isRemoved?: boolean;
  api: () => IChartApi;
  free: (series: ISeriesApi<SeriesType>) => void;
}

export interface ISeriesApiRef {
  api: () => ISeriesApi<SeriesType>;
  free: () => void;
  update: (data: any) => void;
}

export interface PriceRange {
  min: number;
  max: number;
}

export interface DateRange {
  min: Date;
  max: Date;
}

export interface ChartLegend {
  symbol?: string;
  open?: number;
  close?: number;
  low?: number;
  high?: number;
}

export interface ChartContextType {
  listChartId?: ListChartId;
  subCharts?: SubChart[];
  chartLegend?: ChartLegend;
  setSymbol?: (symbol: string) => void;
  setIndicator?: (indicator: any) => void;
}

export interface ListChartId {
  mainChart: string;
  mainRuler: string;
  dateBar: string;
}

export interface SubChart {
  subChartId: string;
  subRulerId: string;
}