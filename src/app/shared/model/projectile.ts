import { Asteroid } from './asteroid';
import { GameObject } from './game-object';
import { Player } from './player';
import { State } from './state';
import { Vector2D } from './vector-2d';

import { Vector2DBuilder } from '../builder/vector-2d.builder';

import { CanvasUtil } from '../util/canvas.util';
import { CollisionUtil } from '../util/collision.util';

import config from './../../../assets/data/config.json';

export class Projectile extends GameObject {
  private _player = Player.getInstance();
  private _state = State.getInstance();

  constructor() {
    super();

    this._width = config.projectile.width;
    this._height = config.projectile.height;
    this._position = this.getInitialPosition();
    this._speed = config.projectile.speed;
    this._img.src = config.projectile.imageSrc;
  }

  private getInitialPosition(): Vector2D {
    return new Vector2DBuilder()
      .x(this._player.x + (this._player.width / 2 - this._width / 2))
      .y(this._player.y)
      .build();
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
