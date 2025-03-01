
export { LineStyle, LineType } from './renderers/draw-line';

export { TrackingModeExitMode } from './model/chart-model';
export { CrosshairMode } from './model/crosshair';
export { PriceScaleMode } from './model/price-scale';
export { PriceLineSource, LastPriceAnimationMode, LasPriceAnimationMode } from './model/series-options';
export { BoxHorizontalAlignment, BoxVerticalAlignment } from './model/line-tool-options';
export { TickMarkType } from './model/time-scale';
export { ColorType } from './model/layout-options';
export { LineEnd } from './renderers/draw-line';
export { TextAlignment } from './model/line-tool-options';

export {
	isBusinessDay,
	isUTCTimestamp,
} from './api/data-consumer';

export { createChart } from './api/create-chart';

export type {DeepPartial} from './helpers/strict-type-checks';
export type { ChartOptions } from './model/chart-model';
export type { IChartApi } from './api/ichart-api';
export type { ISeriesApi } from './api/iseries-api';
export type { SeriesType, LineSeriesOptions, SeriesOptionsCommon } from './model/series-options';

/**
 * Returns the current version as a string. For example `'3.3.0'`.
 */
export function version(): string {
	return process.env.BUILD_VERSION;
}
