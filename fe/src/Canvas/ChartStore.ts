import MainChart from "./MainChart";
import Ruler from "./Ruler";
import {canvasConstants} from "../constants";
import {ToolType} from "../constants/tool";
import DateBar from "./DateBar";

class ChartStore {
  public static instance = new ChartStore();

  public symbol: string = 'VN-Index';
  public mainChart: MainChart = new MainChart(this);
  public mainRuler: Ruler = new Ruler(this);
  public dateBar: DateBar = new DateBar(this);
  public isClicking: boolean = false;
  public scaleX: number = 1;
  public scaleY: number = 10;
  public open: number = 0;
  public close: number = 0;
  public initialized: boolean = false;
  public setChartLegend: any;
  public toolEnabled: ToolType | null = null;
  public inToolProcess: boolean = false;

  public initialize(mainChart: HTMLCanvasElement, mainRuler: HTMLCanvasElement, dateBar: HTMLCanvasElement, setChartLegend: any) {
    this.mainChart.initialize(mainChart);
    this.mainRuler.initialize(mainRuler);
    this.dateBar.initialize(dateBar);
    this.setChartLegend = setChartLegend;
    this.initialized = true;
  }

  public jump(sx: number, sy: number) {
    sx = sx * this.scaleX;
    sy = sy * this.scaleY;
    this.mainChart.jump(sx, sy);
    this.mainRuler.jump(sx, sy);
    this.dateBar.jump(sx, sy);
  }

  public move(dx: number, dy: number) {
    dx *= canvasConstants.RESOLUTION;
    dy *= canvasConstants.RESOLUTION;
    this.mainChart.move(dx, dy);
    this.mainRuler.move(dx, dy);
    this.dateBar.move(dx, dy);
  }

  public draw() {
    window.requestAnimationFrame(() => {
      this.setChartLegend({
        symbol: this.symbol,
        close: this.mainChart.target?.c,
        high: this.mainChart.target?.h,
        low: this.mainChart.target?.l,
        open: this.mainChart.target?.o,
      });
      this.mainChart.draw();
      this.mainRuler.draw();
      this.dateBar.draw();
    });
  }

  public enableTool(type: ToolType) {
    this.toolEnabled = type;
  }

  public disableTool() {
    this.toolEnabled = null;
  }
}

export default ChartStore;