// import {Candle} from "../Canvas/Objects";
// import {IIndicator} from "../interfaces";
//
// const indicators: IIndicator[] = [
//   {
//     title: "Chỉ báo RSI",
//     name: "rsi",
//     calculate: (candles: Candle[]) => {
//       candles = candles.slice().reverse();
//       const n = 14;
//       return candles.map((candle, index) => {
//         if (index < n) return 0;
//         const avgGain = candles.slice(index - n, index).reduce((acc, c, i, arr) => {
//           if (i === 0) return 0;
//           return c.c > arr[i - 1].c ? acc + (c.c - arr[i - 1].c) : acc;
//         }, 0) / n;
//         const avgLoss = candles.slice(index - n, index).reduce((acc, c, i, arr) => {
//           if (i === 0) return 0;
//           return c.c < arr[i - 1].c ? acc + (arr[i - 1].c - c.c) : acc;
//         }, 0) / n;
//         return 100 - 100 / (1 + avgGain / avgLoss);
//       }).reverse();
//     }
//   },
//   {
//     title: "Chỉ báo MACD",
//     name: "macd",
//     calculate: (candles: Candle[]) => {
//       candles = candles.slice().reverse();
//       const short = 12;
//       const long = 26;
//       const signal = 9;
//       const shortEMA = (candles: Candle[], index: number) => {
//         if (index < short) return 0;
//         return candles.slice(index - short, index).reduce((acc, c, i, arr) => {
//           if (i === 0) return c.c;
//           return (2 * c.c + (short - 1) * arr[i - 1].c) / (short + 1);
//         }, 0);
//       };
//       const longEMA = (candles: Candle[], index: number) => {
//         if (index < long) return 0;
//         return candles.slice(index - long, index).reduce((acc, c, i, arr) => {
//           if (i === 0) return c.c;
//           return (2 * c.c + (long - 1) * arr[i - 1].c) / (long + 1);
//         }, 0);
//       };
//       const macd = candles.map((candle, index) => {
//         return shortEMA(candles, index) - longEMA(candles, index);
//       });
//       const signalLine = macd.map((m, index) => {
//         if (index < signal) return 0;
//         return macd.slice(index - signal, index).reduce((acc, m, i, arr) => {
//           if (i === 0) return m;
//           return (2 * m + (signal - 1) * arr[i - 1]) / (signal + 1);
//         }, 0);
//       });
//       return macd.map((m, index) => {
//         if (index < signal) return 0;
//         return m - signalLine[index];
//       }).reverse();
//     }
//   },
// ];
//
// export default indicators;