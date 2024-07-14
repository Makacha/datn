import React, {createContext, useState} from "react";
import {ChartLegend, IIndicator, ISuperChartContext} from "../interfaces";
import {chartHook} from "../hooks";
import stockHook from "../hooks/stockHook";
import {MouseEventParams} from "../lib/api/ichart-api";

export const SuperChartContext = createContext<ISuperChartContext | null>(null);

const SuperChartProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
  const {symbol, setSymbol, data, setPagination} = chartHook.useChart();
  const [isShowStockInfo, setIsShowStockInfo] = React.useState<boolean>(true);
  const {isLoading: isLoadInterestList, interestList, setNeedRefresh} = stockHook.useInterestList();
  const [chartLegend, setChartLegend] = useState<ChartLegend>({} as ChartLegend);
  const [indicators, setIndicators] = useState<IIndicator[]>([]);
  return (
    <SuperChartContext.Provider
      value={{
        symbol, setSymbol, isShowStockInfo, setIsShowStockInfo,
        interestList, isLoadInterestList,
        setNeedRefreshInterestList: setNeedRefresh,
        chartLegend, setChartLegend, data, setPagination,
        indicators, setIndicators,
      }}
    >
      {children}
    </SuperChartContext.Provider>
  );
}

export default SuperChartProvider;