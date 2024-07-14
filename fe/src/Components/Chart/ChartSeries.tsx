import React, {forwardRef, useContext, useEffect, useImperativeHandle, useLayoutEffect, useRef} from "react";
import {ChartContext} from "../../contexts";
import {ISeriesApiRef} from "../../interfaces";
import {
  DeepPartial,
  ISeriesApi,
  LineSeriesOptions,
  SeriesOptionsCommon,
  SeriesType
} from "../../lib";
import {SuperChartContext} from "../../contexts/superChartContext";
import {BarPrices} from "../../lib/model/bar";

interface ChartSeriesProps extends DeepPartial<LineSeriesOptions & SeriesOptionsCommon> {
  children?: React.ReactNode;
  type?: SeriesType;
  data?: any;
}

const ChartSeries = forwardRef((props: ChartSeriesProps, ref) => {
  const parent = useContext(ChartContext);
  const context = React.useContext(SuperChartContext);
  if (!parent || !context) {
    throw new Error('ChartSeries cannot be rendered outside the ChartContainer component');
  }

  const {type, data} = props;
  const {setChartLegend} = context;

  class SeriesApiRef implements ISeriesApiRef {
    private _api: ISeriesApi<SeriesType> | null = null;

    public api() {
      if (!this._api) {
        const chart = parent!.api();
        switch (type) {
          case 'Area':
            this._api = chart.addAreaSeries();
            break;
          case 'Candlestick':
            this._api = chart.addCandlestickSeries();
            parent!.api().subscribeCrosshairMove((params) => {
              if (params.time && params.seriesPrices) {
                const price = (params.seriesPrices.get(this._api!) as BarPrices);
                setChartLegend({
                  open: price.open,
                  high: price.high,
                  low: price.low,
                  close: price.close,
                });
              }
            });
            break;
          default:
            this._api = chart.addLineSeries();
            break;
        }
        this._api.setData(data);
      }
      return this._api;
    }

    public free() {
      if (this._api && parent!.isRemoved) {
        parent!.api().removeSeries(this._api);
      }
    }

    update(data: any): void {
    }
  }

  const seriesApiRef = useRef(new SeriesApiRef());

  useLayoutEffect(() => {
    const currentRef = seriesApiRef.current;
    currentRef.api();
    return () => {
      currentRef.free();
    };
  }, []);

  useLayoutEffect(() => {
    const currentRef = seriesApiRef.current;
    const chart = parent!.api();
    currentRef.api().setData(data);
  }, [data]);

  return (
    <>
      {props.children}
    </>
  );
});

export default ChartSeries;