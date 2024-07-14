import {StockInfo, StockPrice} from "./stock";
import {MouseEventParams} from "../lib/api/ichart-api";
import {ChartLegend} from "./chart";
import {IPagination} from "./common";
import {IIndicator} from "./indicator";

export interface ISuperChartContext {
  symbol: string,
  setSymbol: (symbol: string) => void,
  data: StockPrice[],
  isShowStockInfo: boolean,
  setIsShowStockInfo: (isShowStockInfo: boolean) => void,
  interestList: StockInfo[],
  isLoadInterestList: boolean,
  setNeedRefreshInterestList: (needRefreshInterestList: boolean) => void,
  chartLegend: ChartLegend,
  setChartLegend: (chartLegend: ChartLegend) => void,
  setPagination: (pagination: IPagination) => void,
  indicators: IIndicator[],
  setIndicators: (indicators: IIndicator[]) => void,
}