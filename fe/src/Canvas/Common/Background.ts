import Chart from "../Chart";
import canvasConstants from "../../constants/canvas";

class Background {

  public static draw(chart: Chart) {
    Background.drawVertical(chart);
    Background.drawHorizontal(chart);
  }

  public static drawHorizontal(chart: Chart) {
    const ctx = chart.ctx;
    const sx = chart.sx;
    let distance = canvasConstants.CANDLE_DISTANCE_DEFAULT * chart.chartStore.scaleX;
    const start = sx - sx % distance;
    const end = sx + chart.canvas.width;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 0.2;

    const cnt = (Math.floor(end - start) / distance + 1);
    if (cnt > 20)
      distance *= Math.floor(cnt / 20);

    for (let x = start; x <= end; x += distance) {
      ctx.beginPath();
      ctx.moveTo(x - sx, 0);
      ctx.lineTo(x - sx, chart.canvas.height);
      ctx.stroke();
    }
  }

  private static drawVertical(chart: Chart) {
    const ctx = chart.ctx;
    const sy = chart.sy;
    const base = Math.floor(-sy / chart.chartStore.scaleY);
    const start = base - base % chart.chartStore.scaleY;
    const end = start - ctx.canvas.height / chart.chartStore.scaleY;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 0.2;

    let distance = chart.chartStore.scaleY;
    const cnt = (Math.floor(start - end) / distance + 1);
    if (cnt > 20)
      distance *= Math.floor(cnt / 20);

    for (let y = start; y >= end; y -= distance) {
      ctx.beginPath();
      ctx.moveTo(0, -y * chart.chartStore.scaleY - sy);
      ctx.lineTo(ctx.canvas.width, -y * chart.chartStore.scaleY - sy);
      ctx.stroke();
    }
  }
}

export default Background;