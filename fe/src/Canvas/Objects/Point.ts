import Object, {ObjectOptions} from "./Object";
import {mathConstants} from "../../constants";
import Chart from "../Chart";

enum PointType {
  Circle = 'circle',
  Square = 'square',
}

interface PointOptions extends ObjectOptions {
  size?: number;
  type?: PointType;
}

class Point extends Object {
  public size: number = 1;
  public type: PointType = PointType.Circle;
  private readonly halfSize: number = this.size / 2;

  constructor(
    public x: number,
    public y: number,
    options: PointOptions = {}
  ) {
    super(options);
    this.size = options.size || this.size;
    this.type = options.type || this.type;
    this.halfSize = this.size / 2;
  }

  public isInside(x: number, y: number): boolean {
    switch (this.type) {
      case PointType.Circle:
        return Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2) <= this.halfSize;
      case PointType.Square:
        return Math.abs(x - this.x) <= this.halfSize && Math.abs(y - this.y) <= this.halfSize;
    }
  }

  public move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  public draw(chart: Chart) {
    const ctx = chart.ctx;
    const sx = chart.sx;
    const sy = chart.sy;
    let x = this.x - sx;
    let y = this.y - sy;
    console.log('point', this.x, this.y, this.size, sx, sy, x, y, this.style);
    ctx.fillStyle = this.style;
    ctx.beginPath();
    switch (this.type) {
      case PointType.Circle:
        ctx.arc(x, y, this.halfSize, 0, mathConstants.DPI);
        break;
      case PointType.Square:
        ctx.rect(x - this.halfSize, y - this.halfSize, this.size, this.size);
        break;
    }
    ctx.fill();
  }

  public static generatePoints(x1: number, y1: number, x2: number, y2: number, options: PointOptions = {}): Point[] {
    const points: Point[] = [];
    const num = Math.max(x2 - x1, y2 - y1);
    const stepX = (x2 - x1) / num;
    const stepY = (y2 - y1) / num;
    const x: number[] = [];
    if (x1 <= x2) {
      for (let i = 0; i <= num; i++) {
        x.push(x1 + i * stepX);
      }
    } else {
      for (let i = 0; i <= num; i++) {
        x.push(x1 - i * stepX);
      }
    }
    const y: number[] = [];
    if (y1 <= y2) {
      for (let i = 0; i <= num; i++) {
        y.push(y1 + i * stepY);
      }
    } else {
      for (let i = 0; i <= num; i++) {
        y.push(y1 - i * stepY);
      }
    }
    for (let i = 0; i <= num; i++) {
      points.push(new Point(x[i], y[i], options));
    }
    return points;
  }
}

export default Point;