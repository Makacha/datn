import ChartStore from "./ChartStore";
import {canvasConstants} from "../constants";


class Chart {
  public canvas: HTMLCanvasElement = document.createElement('canvas');
  public ctx: CanvasRenderingContext2D = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  public sx: number = 0;
  public sy: number = 0;
  public mouseLastX: number = 0;
  public mouseLastY: number = 0;

  constructor(
    public chartStore: ChartStore
  ) {
  }

  public initialize(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas.width = this.canvas.clientWidth * canvasConstants.RESOLUTION;
    this.canvas.height = this.canvas.clientHeight * canvasConstants.RESOLUTION;
    new ResizeObserver(
      () => {
        const newWidth = this.canvas.clientWidth * canvasConstants.RESOLUTION;
        this.sx -= newWidth - this.canvas.width;
        this.canvas.width = newWidth;
        this.chartStore.draw();
      }
    ).observe(this.canvas);
  }

  public onMouseMove(event: MouseEvent) {
    const x = event.clientX - this.canvas.getBoundingClientRect().x + 1;
    const y = event.clientY - this.canvas.getBoundingClientRect().y + 1;
    if (this.chartStore.isClicking && this.chartStore.toolEnabled === null) {
      const dx = x - this.mouseLastX;
      const dy = y - this.mouseLastY;
      this.chartStore.move(dx, dy);
    }
    this.mouseLastX = x;
    this.mouseLastY = y;
    this.chartStore.draw();
  }

  public jump(sx: number, sy: number) {
    this.sx = sx;
    this.sy = sy;
  }

  public move(dx: number, dy: number) {
    this.sx -= dx;
    this.sy -= dy;
  }

}

export default Chart;