import Object, {ObjectOptions} from "./Object";
import canvasConstants from "../../constants/canvas";
import Chart from "../Chart";

class Candle extends Object {
  public indicator: any;

  constructor(
    public x: number,
    public o: number,
    public l: number,
    public h: number,
    public c: number,
    public date: Date,
    options: ObjectOptions = {}
  ) {
    super(options);
  }

  public isInside(x: number, y: number): boolean {
    return false;
  }

  public isInViewport(chart: Chart): boolean {
    const scaleX = chart.chartStore.scaleX;
    const distance = canvasConstants.CANDLE_DEFAULT_WIDTH * scaleX;
    return chart.sx - distance <= this.x * scaleX && this.x * scaleX <= chart.sx + chart.canvas.width + distance;
  }

  public move(dx: number, dy: number) {
  }

  public draw(chart: Chart) {
    const ctx = chart.ctx;
    const sx = chart.sx;
    const sy = chart.sy;
    const scaleX = chart.chartStore.scaleX;
    const scaleY = chart.chartStore.scaleY;
    if (this.o <= this.c) {
      ctx.fillStyle = '#009a76';
      ctx.strokeStyle = '#009a76';
    } else {
      ctx.fillStyle = '#e32b1b';
      ctx.strokeStyle = '#e32b1b';
    }
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(this.x * scaleX - sx, -this.l * scaleY - sy);
    ctx.lineTo(this.x * scaleX - sx, -this.h * scaleY - sy);
    ctx.stroke();
    if (canvasConstants.CANDLE_DEFAULT_WIDTH * scaleX > 5)
      ctx.fillRect((this.x - canvasConstants.CANDLE_DEFAULT_WIDTH / 2) * scaleX - sx,
        -this.c * scaleY - sy, canvasConstants.CANDLE_DEFAULT_WIDTH * scaleX, (this.c - this.o) * scaleY);
  }
}

export default Candle;