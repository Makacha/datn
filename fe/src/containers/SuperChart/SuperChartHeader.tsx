import React from "react";
import SearchSymbol from "../../Components/SearchSymbol";
import {SuperChartContext} from "../../contexts/superChartContext";
import {Button} from "antd";
import Menu from "../../Components/Menu";
import SearchIndicator from "../../Components/SearchIndicator";

const SuperChartHeader: React.FC = () => {
  const context = React.useContext(SuperChartContext);
  if (!context) {
    throw new Error("SuperChartContext is not provided");
  }

  const {isShowStockInfo, setIsShowStockInfo} = context;

  return (
    <div className="super-chart-header">
      <div className="header-left">
        <div style={{width:10}}/>
        <Menu/>
        <SearchSymbol/>
        <SearchIndicator/>
      </div>
      <div className="header-right">
        <Button onClick={() => {
          setIsShowStockInfo(!isShowStockInfo)
        }}>Show more info</Button>
        <h1>right</h1>
      </div>
    </div>
  );
}

export default SuperChartHeader;
