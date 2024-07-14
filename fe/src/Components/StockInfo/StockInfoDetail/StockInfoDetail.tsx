import React from "react";
import stockHook from "../../../hooks/stockHook";
import {stockServices} from "../../../services";

const StockInfoDetail: React.FC<{symbol: string}> = ({symbol}) => {

  const {stockInfo} = stockHook.useStockInfo(symbol);

  return (
    <div className="stock-info-detail">
      <h2 style={{textAlign: "center"}}>Thông tin chi tiết</h2>
      <div style={{paddingLeft: "10px", paddingTop: "8px"}}>Mã: {symbol}</div>
      <div style={{paddingLeft: "10px", paddingTop: "8px"}}>Tên: {stockInfo?.name}</div>
      <div style={{paddingLeft: "10px", paddingTop: "8px"}}>Nhóm ngành: {stockInfo?.category}</div>
      <div style={{paddingLeft: "10px", paddingTop: "8px"}}>Giá cuối: {stockInfo?.price}</div>
      <div style={{paddingLeft: "10px", paddingTop: "8px"}}>Thay đổi: {stockInfo?.change}</div>
    </div>
  );
}

export default StockInfoDetail;