import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { State } from './../../shared/model/state';
import { Player } from './../../shared/model/player';
import { EnemySpawner } from './../../shared/model/enemy-spawner';
import { CanvasUtil } from './../../shared/util/canvas.util';

import { GameObjectService } from './../../core/service/game-object.service';
import { GameStatusEnum } from './../../core/enum/game-status.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  private _state: State = State.getInstance();
  private _player: Player = Player.getInstance();
  private _enemySpawner = new EnemySpawner();

  constructor(
    private readonly gameObjectService: GameObjectService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this._state.gameObjects = this.gameObjectService.getGameObjects();

    this.runGame();
  }

  runGame(): void {
    if (this._state.gameStatus == GameStatusEnum.OVER) {
      this.router.navigateByUrl('/over');
    }

    if (this._state.gameStatus == GameStatusEnum.RUNNING) {
      CanvasUtil.clearCanvas();

      this._enemySpawner.spawnEnemies();

      this._state.gameObjects.forEach((obj) => {
        obj.shoot();
        obj.move();
        obj.collide();
        obj.draw();
      });

      this._state.gameObjects = this._state.gameObjects.filter(
        (obj) => obj.isAlive
      );

      requestAnimationFrame(() => this.runGame());
    }
  }

  public get score(): string {
    return this._state.score.toString().padStart(10, '0');
  }

  public get lives(): string {
    return this._player.lives.toString();
  }
}
