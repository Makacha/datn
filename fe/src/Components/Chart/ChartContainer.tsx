import React, {forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef} from "react";
import {ChartOptions, ColorType, createChart, DeepPartial, IChartApi, ISeriesApi, SeriesType} from "../../lib";
import {ChartContext} from "../../contexts";
import {IChartApiRef} from "../../interfaces";
import {SuperChartContext} from "../../contexts/superChartContext";

interface ChartContainerProps extends DeepPartial<ChartOptions> {
  children?: React.ReactNode;
  container: HTMLElement;
}

const ChartContainer = forwardRef((props: ChartContainerProps, ref) => {
  const {container} = props;
  const context = React.useContext(SuperChartContext);
  if (!context) {
    throw new Error("SuperChartContext is not provided");
  }

  const {symbol, isShowStockInfo, setPagination} = context;

  class ChartAPIRef implements IChartApiRef {
    private _api: IChartApi | null = null;

    public isRemoved = false;

    public api() {
      if (!this._api) {
        console.log('Creating chart', container);
        this._api = createChart(container, {
          width: container.clientWidth,
          height: container.clientHeight,
          layout: {
            background: {type: ColorType.Solid, color: 'white'},
          },
          localization: {
            locale: 'vi-VN',
          }
        });
        this._api.timeScale().fitContent();
        this._api.timeScale().subscribeVisibleLogicalRangeChange(
          logicalRange => {
            if (logicalRange === null) {
              return;
            }
            if (logicalRange.from < 10) {
              setPagination(
                {
                  page: 1,
                  pageSize:  5000,
                  total: 0,
                }
              )
            }
          }
        );
      }
      return this._api;
    }

    public free() {
      if (this._api) {
        this._api.remove();
      }
    }
  }

  const chartApiRef = useRef(new ChartAPIRef());
  useLayoutEffect(() => {
    const chart = chartApiRef.current.api();
    const handleResize = () => {
      chart.applyOptions({width: container.clientWidth - (isShowStockInfo ? 304 : 0)});
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useLayoutEffect(() => {
    const chart = chartApiRef.current.api();
    chart.applyOptions({width: container.clientWidth - (isShowStockInfo ? 304 : 0)});
  }, [isShowStockInfo]);
  return (
    <ChartContext.Provider value={chartApiRef.current}>
      {props.children}
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = 'ChartContainer';

export default ChartContainer;