import { GameObject } from './game-object';
import { Vector2D } from './vector-2d';
import { State } from './state';
import { Player } from './player';

import { Vector2DBuilder } from '../builder/vector-2d.builder';

import { CanvasUtil } from '../util/canvas.util';
import { CollisionUtil } from '../util/collision.util';

export class Asteroid extends GameObject {
  private _hitPoints: number = 2;
  private _state: State = State.getInstance();
  private _player: Player = Player.getInstance();

  constructor(spawnPosition: Vector2D) {
    super();

    this._width = 50;
    this._height = 50;
    this._position = spawnPosition;
    this._speed = new Vector2DBuilder().y(2).build();
    this._img.src = './../../../assets/image/asteroid-01.png';
  }

  public move(): void {
    let newPosY = this.y + this._speed.y;
    let newPosX = this._position.x;

    this._position = new Vector2DBuilder().x(newPosX).y(newPosY).build();
  }

  public collide(): void {
    if (CollisionUtil.isColliding(this, this._player) && this._isAlive) {
      console.log('colidiu');
      this._isAlive = false;
      this._player.setDamage();
    }
  }

  public draw(): void {
    CanvasUtil.drawGameObject(this);
  }

  public shoot(): void {}

  public override get isAlive(): boolean {
    return this.y < 600 && this._hitPoints > 0;
  }

  public override set isAlive(value: boolean) {
    this._isAlive = value;
  }

  public setDamage(): void {
    this._hitPoints--;

    if (this._hitPoints <= 0) {
      this._state.score += 100;
    }
  }
}
