import React, {useContext, useEffect} from "react";
import {SuperChartContext} from "../../contexts/superChartContext";

import "./StockInfo.scss";
import InterestList from "./InterestList";
import StockInfoDetail from "./StockInfoDetail";

const StockInfo: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const context = useContext(SuperChartContext);
  if (!context) {
    throw new Error("SuperChartContext is not provided");
  }

  const {isShowStockInfo} = context;

  const [showDetail, setShowDetail] = React.useState<string>("");

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.hidden = !isShowStockInfo;
    }
  }, [isShowStockInfo]);

  return (
    <div className="stock-info" ref={ref}>
      <InterestList setShowDetail={setShowDetail} />
      {
        showDetail && <StockInfoDetail symbol={showDetail}/>
      }
    </div>
  );
}

export default StockInfo;