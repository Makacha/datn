import React, {useCallback, useState} from "react";
import ChartContainer from "./ChartContainer";
import {ChartOptions, DeepPartial} from "../../lib/";

interface ChartProps extends DeepPartial<ChartOptions> {
  children?: React.ReactNode;
}

const Chart: React.FC<ChartProps> = (props) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const handleRef = useCallback((ref: HTMLDivElement | null) => setContainer(ref), []);
  return (
    <div ref={handleRef} style={{height: "100%"}}>
      {container && <ChartContainer container={container} {...props}/>}
    </div>
  );
}

export default Chart;