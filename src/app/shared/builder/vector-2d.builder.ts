import { Vector2D } from '../model/vector-2d';

export class Vector2DBuilder {
  private _x!: number;
  private _y!: number;

  public x(x: number): Vector2DBuilder {
    this._x = x;
    return this;
  }

  public y(y: number): Vector2DBuilder {
    this._y = y;
    return this;
  }

  public build(): Vector2D {
    return new Vector2D(this._x, this._y);
  }
}
