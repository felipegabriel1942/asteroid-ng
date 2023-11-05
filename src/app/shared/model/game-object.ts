import { Vector2D } from './vector-2d';

export abstract class GameObject {
  protected _position!: Vector2D;
  protected _speed!: Vector2D;
  protected _img = new Image();
  protected _width!: number;
  protected _height!: number;
  protected _isAlive: boolean = true;

  public abstract move(): void;

  public abstract collide(): void;

  public abstract draw(): void;

  public abstract shoot(): void;

  public get img(): HTMLImageElement {
    return this._img;
  }

  public get height(): number {
    return this._height;
  }

  public get width(): number {
    return this._width;
  }

  public get x(): number {
    return this._position.x;
  }

  public get y(): number {
    return this._position.y;
  }

  public get isAlive(): boolean {
    return this._isAlive;
  }

  public set isAlive(value: boolean) {
    this._isAlive = value;
  }

}
