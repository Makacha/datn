import React, {useContext} from "react";
import {SuperChartContext} from "../../contexts/superChartContext";
import {DOWN_COLOR, UP_COLOR} from "../../constants/common";

const ChartLegend: React.FC = () => {
  const context = useContext(SuperChartContext);
  if (!context) {
    throw new Error("SuperChartContext is not provided");
  }
  const {symbol, chartLegend} = context;

  const color = chartLegend.close && chartLegend.open && chartLegend.close > chartLegend.open ? UP_COLOR : DOWN_COLOR;
  return (
    <div className={"chart-legend"}>
      <span style={{fontSize: "18px"}}> {symbol} - </span>
      <span> O </span>
      <span style={{color: color}}>{chartLegend.open}</span>
      <span> C </span>
      <span style={{color: color}}>{chartLegend.close}</span>
      <span> L </span>
      <span style={{color: color}}>{chartLegend.low}</span>
      <span> H </span>
      <span style={{color: color}}>{chartLegend.high}</span>
    </div>
  );
}

export default ChartLegend;