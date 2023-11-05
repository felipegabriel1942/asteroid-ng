import { Asteroid } from './asteroid';
import { GameObject } from './game-object';
import { Player } from './player';
import { State } from './state';

import { Vector2DBuilder } from '../builder/vector-2d.builder';

import { CanvasUtil } from '../util/canvas.util';
import { CollisionUtil } from '../util/collision.util';

export class Projectile extends GameObject {
  private _player = Player.getInstance();
  private _state = State.getInstance();

  constructor() {
    super();

    this._width = 15;
    this._height = 15;
    this._position = new Vector2DBuilder()
      .x(this._player.x + (this._player.width / 2 - this._width / 2))
      .y(this._player.y)
      .build();
    this._speed = new Vector2DBuilder().y(-5).build();
    this._img.src = './../../../assets/image/projectile-01.png';
  }

  public move(): void {
    let newPosY = this._position.y + this._speed.y;
    let newPosX = this._position.x;

    this._position = new Vector2DBuilder().x(newPosX).y(newPosY).build();
  }

  public collide(): void {
    this._state.gameObjects = this._state.gameObjects.map((obj) => {
      if (obj instanceof Asteroid && CollisionUtil.isColliding(this, obj)) {
        obj.setDamage();
        this._isAlive = false;
      }

      return obj;
    });
  }

  public draw(): void {
    CanvasUtil.drawGameObject(this);
  }

  public shoot(): void {}

  public override get isAlive(): boolean {
    if (this._position.y < 0) {
      this._isAlive = false;
    }

    return this._isAlive;
  }
}
