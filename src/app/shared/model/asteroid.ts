import { GameObject } from './game-object';
import { Vector2D } from './vector-2d';
import { State } from './state';
import { Player } from './player';

import { Vector2DBuilder } from '../builder/vector-2d.builder';

import { CanvasUtil } from '../util/canvas.util';
import { CollisionUtil } from '../util/collision.util';

import config from './../../../assets/data/config.json';

export class Asteroid extends GameObject {
  private _hitPoints: number = config.asteroid.hitPoints;
  private _state: State = State.getInstance();
  private _player: Player = Player.getInstance();

  constructor(spawnPosition: Vector2D) {
    super();

    this._width = config.asteroid.width;
    this._height = config.asteroid.height;
    this._position = spawnPosition;
    this._speed = config.asteroid.speed;
    this._img.src = config.asteroid.imageSrc;
  }

  public move(): void {
    let newPosY = this.y + this._speed.y;
    let newPosX = this._position.x;

    this._position = new Vector2DBuilder().x(newPosX).y(newPosY).build();
  }

  public collide(): void {
    if (CollisionUtil.isColliding(this, this._player) && this._isAlive) {
      this._isAlive = false;
      this._player.setDamage();
    }
  }

  public draw(): void {
    CanvasUtil.drawGameObject(this);
  }

  public shoot(): void {}

  public override get isAlive(): boolean {
    return this.y < config.canvas.height && this._hitPoints > 0;
  }

  public override set isAlive(value: boolean) {
    this._isAlive = value;
  }

  public setDamage(): void {
    this._hitPoints--;

    if (this._hitPoints <= 0) {
      this._state.score += config.asteroid.points;
    }
  }
}
