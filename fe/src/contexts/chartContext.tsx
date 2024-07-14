import {createContext} from "react";
import {IChartApiRef} from "../interfaces";

const ChartContext = createContext<IChartApiRef | null>(null);

export default ChartContext;