import React, {useContext, useEffect, useRef} from "react";
import {Chart, ChartSeries} from "../../Components/Chart";
import {chartHook} from "../../hooks";
import SuperChartHeader from "./SuperChartHeader";

import "./SuperChart.scss";
import StockInfo from "../../Components/StockInfo";
import ChartLegend from "./ChartLegend";
import {SuperChartContext} from "../../contexts/superChartContext";

const SuperChart: React.FC = () => {
  const context = useContext(SuperChartContext);
  if (!context) {
    throw new Error("SuperChartContext is not provided");
  }

  const {data, indicators} = context;
  return (
    <div className="super-chart">
      <SuperChartHeader/>
      <div className="main-chart">
        <ChartLegend/>
        <Chart>
          <ChartSeries type={"Candlestick"} data={data}/>
          {indicators.map((indicator) => {
            if (indicator.name === "Relative Strength Indicator") {
              // calculate RSI data
              const n = 14;
              const newData =  data.map((price, index) => {
                if (index < n) return {
                  time: price.time,
                  value: 0
                };
                const avgGain = data.slice(index - n, index).reduce((acc, c, i, arr) => {
                  if (i === 0) return 0;
                  return c.close > arr[i - 1].close ? acc + (c.close - arr[i - 1].close) : acc;
                }, 0) / n;
                const avgLoss = data.slice(index - n, index).reduce((acc, c, i, arr) => {
                  if (i === 0) return 0;
                  return c.close < arr[i - 1].close ? acc + (arr[i - 1].close - c.close) : acc;
                }, 0) / n;
                return {
                  time: price.time,
                  value: 100 - 100 / (1 + avgGain / avgLoss)
                };
              });
              console.log(newData);
              return (
                <ChartSeries
                  key={indicator.name}
                  type={"Line"}
                  data={newData}
                />
              );
            }
            return null;
          })}
        </Chart>
        <StockInfo></StockInfo>
      </div>
    </div>
  )
}

export default SuperChart;