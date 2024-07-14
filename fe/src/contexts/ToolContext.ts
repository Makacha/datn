import {createContext} from "react";
import {ToolType} from "../constants/tool";

const ToolContext = createContext<ToolType | null>(null);

export default ToolContext;
