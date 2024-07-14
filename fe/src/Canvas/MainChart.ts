import DLList from "../Algorithms/DLList";
import {Candle, Line, Object, Segment} from "./Objects";
import Chart from "./Chart";
import Background from "./Common/Background";
import {ToolType} from "../constants/tool";
import {canvasConstants} from "../constants";

class MainChart extends Chart {

  public candles: DLList<Candle> = new DLList();
  public objects: DLList<Object> = new DLList();
  public indicator: number[] = [];
  public indicatorName: string = '';
  public selected: Object | null = null;
  public target: Candle | null = null;

  public initialize(canvas: HTMLCanvasElement) {
    super.initialize(canvas);
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('mouseout', this.onMouseOut.bind(this));
    this.canvas.addEventListener('wheel', this.onWheel.bind(this));
  }

  public draw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    Background.draw(this);
    this.candles.filter(candle => candle.isInViewport(this)).forEach(candle => candle.draw(this));
    this.drawIndicator();
    this.drawCurrentPrice();
    this.objects.forEach(object => object.draw(this));
  }

  public drawIndicator() {
    switch (this.indicatorName) {
      case 'rsi':
        this.ctx.strokeStyle = '#ffd659';
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        for (let i = 1; i < this.indicator.length; i++) {
          if (this.candles.get(i - 1)!.isInViewport(this) && this.candles.get(i)!.isInViewport(this)) {
            this.ctx.moveTo(this.candles.get(i - 1)!.x * this.chartStore.scaleX - this.sx, (100 - this.indicator[i - 1]) * this.canvas.height / 100);
            this.ctx.lineTo(this.candles.get(i)!.x * this.chartStore.scaleX - this.sx, (100 - this.indicator[i]) * this.canvas.height / 100);
          }
        }
        this.ctx.stroke();
        this.ctx.setLineDash([12, 6]);
        this.ctx.strokeStyle = '#004c6b';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height * 0.3);
        this.ctx.lineTo(this.canvas.width, this.canvas.height * 0.3);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height * 0.7);
        this.ctx.lineTo(this.canvas.width, this.canvas.height * 0.7);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height * 0.5);
        this.ctx.lineTo(this.canvas.width, this.canvas.height * 0.5);
        this.ctx.stroke();
        this.ctx.setLineDash([]);
        break;
      case 'macd':
        for (let i = 1; i < this.indicator.length; i++) {

        }
        break;
    }
  }

  public drawCurrentPrice() {
    const open = this.chartStore.open;
    const close = this.chartStore.close;
    this.ctx.strokeStyle = close > open ? '#009a76' : '#e32b1b';
    this.ctx.lineWidth = 4;
    this.ctx.beginPath();
    this.ctx.setLineDash([4, 6]);
    this.ctx.moveTo(0, -close * this.chartStore.scaleY - this.sy);
    this.ctx.lineTo(this.ctx.canvas.width, -close * this.chartStore.scaleY - this.sy);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    this.ctx.fillStyle = close > open ? '#009a76' : '#e32b1b';
    this.ctx.fillRect(this.ctx.canvas.width - 180, -close * this.chartStore.scaleY - this.sy - 23, 180, 46);
    this.ctx.fillStyle = '#ffffff';
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(this.chartStore.symbol.toUpperCase(), this.ctx.canvas.width - 90, -close * this.chartStore.scaleY - this.sy + 10);
  }

  public onMouseMove(event: MouseEvent) {
    const x = event.clientX - this.canvas.getBoundingClientRect().x + 1;
    this.target = this.candles.min(candle => {
      return Math.abs(candle.x * this.chartStore.scaleX - this.sx - x * canvasConstants.RESOLUTION);
    });
    this.handelToolWhenMouseMove(event);
    if (this.chartStore.toolEnabled !== null && this.chartStore.isClicking) {
    }
    super.onMouseMove(event);
  }

  public onMouseDown(event: MouseEvent) {
    if (event.button === 0) {
      const x = event.clientX - this.canvas.getBoundingClientRect().x + 1;
      const y = event.clientY - this.canvas.getBoundingClientRect().y + 1;
      this.handleToolWhenMouseDown(event);
      this.chartStore.isClicking = true;
      this.selected = this.getCandidate(x, y);
      this.canvas.style.cursor = this.chartStore.toolEnabled ? 'none' : (this.selected ? 'move' : 'grab');
      this.chartStore.draw();
    }
  }

  public onMouseUp(event: MouseEvent) {
    if (event.button === 0) {
      this.chartStore.isClicking = false;
      this.selected = null;
      this.canvas.style.cursor = 'auto';
    }
  }

  public onMouseOut(event: MouseEvent) {
    this.chartStore.isClicking = false;
    this.selected = null;
    this.canvas.style.cursor = 'auto';
  }

  public onWheel(event: WheelEvent) {
    const delta = event.deltaY;
    this.chartStore.scaleX += (delta < 0 ? 0.1 : -0.1) * this.chartStore.scaleX;
    this.chartStore.draw();
  }

  public getCandidate(x: number, y: number): Object | null {
    return this.objects.first(obj => obj.isDragAble && obj.isInside(x + this.sx, y + this.sy));
  }

  public handelToolWhenMouseMove(event: MouseEvent) {
    const x = event.clientX - this.canvas.getBoundingClientRect().x + 1;
    const y = event.clientY - this.canvas.getBoundingClientRect().y + 1;
    switch (this.chartStore.toolEnabled) {
      case ToolType.pen:
        if (this.chartStore.isClicking) {
          const x1 = this.mouseLastX * canvasConstants.RESOLUTION + this.sx;
          const y1 = this.mouseLastY * canvasConstants.RESOLUTION + this.sy;
          const x2 = x * canvasConstants.RESOLUTION + this.sx;
          const y2 = y * canvasConstants.RESOLUTION + this.sy;
          this.objects.pushBack(new Line(x1, y1, x2, y2, {thickness: 10, style: '#000000'}));
        }
        break;
      case ToolType.highlighter:
        break;
      case ToolType.trendLine:
        if (this.chartStore.inToolProcess) {
          const segment = this.objects.popBack() as Segment;
          const x2 = x * canvasConstants.RESOLUTION + this.sx;
          const y2 = y * canvasConstants.RESOLUTION + this.sy;
          this.objects.pushBack(new Segment(segment.x1, segment.y1, x2, y2, {thickness: 2, style: '#0096d2'}));
        }
        break;
    }
  }


  public handleToolWhenMouseDown(event: MouseEvent) {
    const x = event.clientX - this.canvas.getBoundingClientRect().x + 1;
    const y = event.clientY - this.canvas.getBoundingClientRect().y + 1;
    switch (this.chartStore.toolEnabled) {
      case ToolType.pen:
        break;
      case ToolType.highlighter:
        break;
      case ToolType.trendLine:
        if (!this.chartStore.inToolProcess) {
          const x1 = x * canvasConstants.RESOLUTION + this.sx;
          const y1 = y * canvasConstants.RESOLUTION + this.sy;
          this.objects.pushBack(new Segment(x1, y1, x1, y1, {thickness: 2, style: '#0096d2'}));
        }
        this.chartStore.inToolProcess = !this.chartStore.inToolProcess;
        break;
    }
  }
}

export default MainChart;