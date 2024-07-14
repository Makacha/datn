import Chart from "./Chart";
import {canvasConstants} from "../constants";

class DateBar extends Chart {
  public jump(sx: number, sy: number) {
    this.sx = sx;
  }

  public move(dx: number, dy: number) {
    this.sx -= dx;
  }

  public draw() {
    const ctx = this.ctx;
    const sx = this.sx;
    const candles = this.chartStore.mainChart.candles.filter(candle => candle.isInViewport(this));
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    const distance = this.chartStore.scaleX * canvasConstants.CANDLE_DISTANCE_DEFAULT;

    this.ctx.font = '36px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#000000';
    let lastMonth = -1;
    candles.forEach(candle => {
      const date = candle.date;
      const day = date.getDate().toString();
      const month = date.toLocaleDateString('vi-VN', {month: 'long'});
      const year = date.getFullYear().toString();
      if (distance >= 200) {
        if (lastMonth !== date.getMonth())
          this.ctx.fillText(month, candle.x * this.chartStore.scaleX - this.sx, 45);
        else
          this.ctx.fillText(day, candle.x * this.chartStore.scaleX - this.sx, 45);
      } else if (distance >= 40) {
        if (date.getDay() === 1) {
          if (date.getDate() <= 7)
            this.ctx.fillText(month, candle.x * this.chartStore.scaleX - this.sx, 45);
          else
            this.ctx.fillText(day, candle.x * this.chartStore.scaleX - this.sx, 45);
        }
      } else if (distance >= 10) {
        if (lastMonth !== date.getMonth()) {
          if (date.getMonth() === 0)
            this.ctx.fillText(year, candle.x * this.chartStore.scaleX - this.sx, 45);
          else
            this.ctx.fillText(month, candle.x * this.chartStore.scaleX - this.sx, 45);
        }
      } else {
        if (lastMonth !== date.getMonth()) {
          if (date.getMonth() === 0)
            this.ctx.fillText(year, candle.x * this.chartStore.scaleX - this.sx, 45);
          else
            this.ctx.fillText((date.getMonth() + 1).toString(), candle.x * this.chartStore.scaleX - this.sx, 45);
        }
      }
      lastMonth = date.getMonth();
    });
    if (this.chartStore.mainChart.target !== null) {
      const x = this.chartStore.mainChart.target?.x;
      this.ctx.fillRect(x * this.chartStore.scaleX - 200 - sx, 10, 400, this.canvas.height - 20);
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillText(this.chartStore.mainChart.target.date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'short',
      }), x * this.chartStore.scaleX - sx, 45);
    }
  }
}

export default DateBar;