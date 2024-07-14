import * as React from "react";
import {ToolType} from "../constants/tool";

export interface ToolClass {
  title: string;
  icon: React.ReactNode;
  toolGroups: ToolGroup[];
  action?: () => void;
}

export interface ToolGroup {
  title: string;
  tools: Tool[];
}

export interface Tool {
  type: ToolType,
  icon: React.ReactNode,
  title: string,
}