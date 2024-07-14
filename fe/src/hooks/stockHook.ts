import {useEffect, useState} from "react";
import {stockServices} from "../services";
import {StockSymbol} from "../interfaces";
import {StockInfo} from "../interfaces";

const useSymbol = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [data, setData] = useState<StockSymbol[]>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await stockServices.searchSymbol(keyword);
      setData(result.data ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData().then(r => r);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [keyword]);

  return {
    isLoading,
    setKeyword,
    data,
  }
}

const useStockInfo = (symbol: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [stockInfo, setStockInfo] = useState<StockInfo>();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await stockServices.getStockInfo(symbol);
      setStockInfo(result.data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData().then(r => r);
  }, [symbol]);

  return {
    isLoading,
    stockInfo,
  }

}

const useInterestList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [interestList, setInterestList] = useState<StockInfo[]>([]);
  const [needRefresh, setNeedRefresh] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await stockServices.getInterestList();
      setInterestList(result.data ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (needRefresh) {
      fetchData().then(r => r);
      setNeedRefresh(false);
    }
  }, [needRefresh]);

  return {
    isLoading,
    interestList,
    setNeedRefresh,
  }
}

const stockHook = {
  useSymbol,
  useInterestList,
  useStockInfo,
}

export default stockHook;