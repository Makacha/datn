import {useEffect, useLayoutEffect, useState} from "react";
import {IIndicator, IPagination, StockPrice} from "../interfaces";
import data_sample from "../mocks/data_sample.json";
import {chartServices, stockServices} from "../services";
import {Pagination} from "antd";
import {result} from "lodash";

const useChart = () => {

  const [symbol, setSymbol] = useState<string>('VNINDEX');
  const [data, setData] = useState<StockPrice[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 200,
    total: 0,
  } as IPagination);

  const fetchData = async () => {
    const result = await stockServices.getStockHistory(
      symbol,
      undefined,
      undefined,
      pagination.page,
      pagination.pageSize,
    );
    setData(result.data ?? []);
  }

  useLayoutEffect(() => {
    fetchData().then(r => r);
  }, [symbol]);

  useLayoutEffect(() => {
    fetchData().then(r => r);
  }, [pagination]);


  return {
    data,
    symbol,
    setSymbol,
    setPagination,
  }
};

const useIndicator = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [indicators, setIndicators] = useState<IIndicator[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 20,
    total: 0,
  } as IPagination);


  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await chartServices.getIndicators(
        keyword,
        pagination.page,
        pagination.pageSize,
      );
      setIndicators(result.data ?? []);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData().then(r => r);
  }, []);

  return {
    isLoading,
    setKeyword,
    indicators,
  }

}

const chartHook = {
  useChart,
  useIndicator,
};
export default chartHook;