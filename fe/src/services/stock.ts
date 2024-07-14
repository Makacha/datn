import {requestHelpers} from "../helpers";
import services from "./request";
import {IDataResponse, StockInfo, StockPrice} from "../interfaces";
import {StockSymbol} from "../interfaces";


function searchSymbol(keyword: string, page?: number, pageSize?: number): Promise<IDataResponse<StockSymbol[]>>  {
  return services.get(`/stock/search`, {
    params: {
      keyword,
      page: page ?? 1,
      page_size: pageSize ?? 20,
    }
  }).then(requestHelpers.getResult<StockSymbol[]>);
}

const getStockHistory = async (symbol: string, start?: string, end?: string, page?: number, pageSize?: number) => {
  return services.get(`/stock/history`, {
    params: {
      symbol,
      start,
      end,
      page: page ?? 1,
      page_size: pageSize ?? 5,
    }
  }).then(requestHelpers.getResult<StockPrice[]>);
}

const getStockInfo = async (symbol: string) => {
  return services.get(`/stock/info/${symbol}`).then(requestHelpers.getResult<StockInfo>);
}

const addToInterestList = async (symbol: string) => {
  return services.post(`/stock/interest/${symbol}`).then(requestHelpers.getResult);
}

const deleteFromInterestList = async (symbol: string) => {
  return services.delete(`/stock/interest/${symbol}`).then(requestHelpers.getResult);
}

const getInterestList = async () => {
  return services.get(`/stock/interest`).then(requestHelpers.getResult<StockInfo[]>);
}

const stockServices = {
  searchSymbol,
  getStockHistory,
  addToInterestList,
  deleteFromInterestList,
  getInterestList,
  getStockInfo,
}

export default stockServices;
