import Chart from "../Chart";
import {Object, ObjectOptions} from "./index";

interface SegmentOptions extends ObjectOptions {
  thickness?: number;
}

class Segment extends Object {
  public thickness: number = 1;

  constructor(
    public x1: number,
    public y1: number,
    public x2: number,
    public y2: number,
    options: SegmentOptions = {}
  ) {
    super(options);
    this.thickness = options.thickness || this.thickness;
  }

  public isInside(x: number, y: number): boolean {
    const x1 = this.x1;
    const y1 = this.y1;
    const x2 = this.x2;
    const y2 = this.y2;
    const crossProduct = (y - y1) * (x2 - x1) - (x - x1) * (y2 - y1);
    if (Math.abs(crossProduct) > 0.1) return false;

    const dotProduct = (x - x1) * (x2 - x1) + (y - y1) * (y2 - y1);
    if (dotProduct < 0) return false;

    const squaredLength = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    return dotProduct <= squaredLength;

  }

  public draw(chart: Chart) {
    const ctx = chart.ctx;
    const sx = chart.sx;
    const sy = chart.sy;
    ctx.strokeStyle = this.style;
    ctx.fillStyle = this.style;
    ctx.beginPath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(this.x1 * chart.chartStore.scaleX - sx, this.y1 - sy);
    ctx.lineTo(this.x2 * chart.chartStore.scaleX - sx, this.y2 - sy);
    ctx.stroke();
  }
}

export default Segment;