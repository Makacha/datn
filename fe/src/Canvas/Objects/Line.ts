import Chart from "../Chart";
import {Object, ObjectOptions} from "./index";

interface LineOptions extends ObjectOptions {
  thickness?: number;
}

class Line extends Object {
  public thickness: number = 1;

  constructor(
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
    options: LineOptions = {}
  ) {
    super(options);
    this.thickness = options.thickness || this.thickness;
  }

  public isInside(x: number, y: number): boolean {
    return true;
  }

  public draw(chart: Chart) {
    const ctx = chart.ctx;
    const sx = chart.sx;
    const sy = chart.sy;
    ctx.strokeStyle = this.style;
    ctx.beginPath();
    ctx.moveTo(this.x1 * chart.chartStore.scaleX - sx, this.y1 - sy);
    ctx.lineTo(this.x2 * chart.chartStore.scaleX - sx, this.y2 - sy);
    ctx.stroke();
  }
}

export default Line;