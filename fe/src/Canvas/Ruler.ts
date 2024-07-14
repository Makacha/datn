import Chart from "./Chart";
import {canvasConstants} from "../constants";

class Ruler extends Chart {

  public isDragging: boolean = false;

  public initialize(canvas: HTMLCanvasElement) {
    super.initialize(canvas);
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  public onMouseEnter(event: MouseEvent) {
    this.canvas.style.cursor = 'n-resize';
  }

  public onMouseLeave(event: MouseEvent) {
    this.canvas.style.cursor = 'auto';
  }

  public onMouseMove(event: MouseEvent) {
    const y = event.clientY - this.canvas.getBoundingClientRect().y + 1;
    const dy = y - this.mouseLastY;
    if (this.isDragging) {
      const middle = (-this.sy - this.canvas.height / 2) / this.chartStore.scaleY;
      this.chartStore.scaleY += (dy < 0 ? 0.1 : -0.1) * this.chartStore.scaleY;
      const newMiddle = middle + this.canvas.height / 2 / this.chartStore.scaleY;
      this.chartStore.jump(this.chartStore.mainChart.sx / this.chartStore.scaleX, -newMiddle);
      this.chartStore.draw();
    }
    this.mouseLastY = y;
  }

  public onMouseDown(event: MouseEvent) {
    if (event.button === 0) {
      this.isDragging = true;
    }
  }

  public onMouseUp(event: MouseEvent) {
    if (event.button === 0) {
      this.isDragging = false;
    }
  }

  public jump(sx: number, sy: number) {
    this.sy = sy;
  }

  public move(dx: number, dy: number) {
    this.sy -= dy;
  }

  public draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.font = '30px Arial';
    const start = Math.ceil(-this.sy / this.chartStore.scaleY / 10) * 10;
    const end = Math.floor((-this.sy - this.canvas.height) / this.chartStore.scaleY / 10) * 10;
    const step = (start - end) / 20;
    this.ctx.textAlign = 'right';
    this.ctx.fillStyle = '#000000';
    console.log(this.chartStore.scaleY, this.sy, start, end, step)
    for (let i = start; i >= end; i -= step) {
      console.log(-i * this.chartStore.scaleY - this.sy);
      this.ctx.fillText(i.toFixed(2), this.ctx.canvas.width - 12, -i * this.chartStore.scaleY - this.sy);
    }
    if (start >= this.chartStore.close && this.chartStore.close >= end) {
      this.ctx.fillStyle = this.chartStore.close > this.chartStore.open ? '#009a76' : '#e32b1b';
      this.ctx.fillRect(4, -this.chartStore.close * this.chartStore.scaleY - this.sy - 18, this.ctx.canvas.width, 46);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillText(this.chartStore.close.toFixed(2), this.ctx.canvas.width - 12, -this.chartStore.close * this.chartStore.scaleY - this.sy + 15);
    }

    const y = this.chartStore.mainChart.mouseLastY;
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(4, y * canvasConstants.RESOLUTION - 30, this.ctx.canvas.width - 5, 50);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText((-(this.sy + y * canvasConstants.RESOLUTION) / this.chartStore.scaleY).toFixed(2), this.ctx.canvas.width - 12, y * canvasConstants.RESOLUTION + 5);
  }

}

export default Ruler;