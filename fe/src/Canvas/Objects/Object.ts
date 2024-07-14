import Chart from "../Chart";

interface ObjectOptions {
  style?: string | CanvasGradient | CanvasPattern;
  isDragAble?: boolean;
}

class Object {
  public style: string | CanvasGradient | CanvasPattern = 'black';
  public isDragAble: boolean = false;

  constructor(
    options: ObjectOptions = {}
  ) {
    this.style = options.style || this.style;
    this.isDragAble = options.isDragAble || this.isDragAble;
  }

  public isInside(x: number, y: number): boolean {
    throw new Error('Method not implemented.');
  }

  public move(dx: number, dy: number) {
    throw new Error('Method not implemented.');
  }

  public draw(chart: Chart) {
    throw new Error('Method not implemented.');
  }
}

export type {ObjectOptions};
export default Object;