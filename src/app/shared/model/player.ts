import { GameStatusEnum } from './../../core/enum/game-status.enum';
import { State } from './state';
import { GameObject } from './game-object';
import { CanvasUtil } from '../util/canvas.util';
import { Control } from './control';
import { Projectile } from './projectile';
import { Vector2DBuilder } from '../builder/vector-2d.builder';

export class Player extends GameObject {
  private _intervalBetweenShoots: number = 0.4;
  private _hasShooted: boolean = false;
  private _timeSinceLastShoot: number = 0;
  private _canvasWidth = 400;
  private _canvasHeight = 600;
  private _control = Control.getInstance();
  private _state = State.getInstance();
  private _lives = 3;

  private static instance: Player;

  private constructor() {
    super();

    this._width = 40;
    this._height = 40;

    this._position = new Vector2DBuilder()
      .x((this._canvasWidth - this._width) / 2)
      .y(this._canvasHeight - this._height)
      .build();

    this._speed = new Vector2DBuilder().x(4).build();
    this._img.src = './../../../assets/image/spaceship-01.png';
  }

  public static getInstance(): Player {
    if (!Player.instance) {
      Player.instance = new Player();
    }

    return Player.instance;
  }

  public move(): void {
    let newPosX = this._position.x;
    let newPosY = this._position.y;

    if (this._control.right) {
      newPosX += this._speed.x;

      if (this._position.x + this._width > this._canvasWidth) {
        newPosX = this._canvasWidth - this._width;
      }
    } else if (this._control.left) {
      newPosX -= this._speed.x;

      if (this._position.x < 0) {
        newPosX = 0;
      }
    }

    this._position = new Vector2DBuilder().x(newPosX).y(newPosY).build();
  }

  public collide(): void {}

  public draw(): void {
    CanvasUtil.drawGameObject(this);
  }

  public shoot(): void {
    if (this._control.shoot && !this._hasShooted) {
      this._hasShooted = true;
      this._timeSinceLastShoot = 0;
      this._state.gameObjects.push(new Projectile());
    }

    this._timeSinceLastShoot++;

    if (
      this._hasShooted &&
      this._timeSinceLastShoot / 60 > this._intervalBetweenShoots
    ) {
      this._hasShooted = false;
    }
  }

  public get lives(): number {
    return this._lives;
  }

  public setDamage(): void {
    this._lives--;

    if (this._lives <= 0) {
      this._state.gameStatus = GameStatusEnum.OVER;
    }
  }
}
