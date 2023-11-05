import { Component, HostListener, OnInit } from '@angular/core';

import { GameObjectService } from './core/service/game-object.service';
import { GameStatusEnum } from './core/enum/game-status.enum';

import { CanvasUtil } from './shared/util/canvas.util';
import { Control } from './shared/model/control';
import { State } from './shared/model/state';
import { EnemySpawner } from './shared/model/enemy-spawner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'asteroid-ng';

  private _state = State.getInstance();
  private _enemySpawner = new EnemySpawner();

  // TODO: MOVER LOGICA PARA OUTRAS CLASSES
  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  captureInput(event: KeyboardEvent): void {
    const control = Control.getInstance();

    if (event.code == 'Space') {
      control.shoot = event.type === 'keydown';
    }

    if (event.code == 'KeyD') {
      control.right = event.type === 'keydown';
    }

    if (event.code == 'KeyA') {
      control.left = event.type === 'keydown';
    }
  }

  constructor(private readonly gameObjectService: GameObjectService) {}

  ngOnInit(): void {
    this._state.gameObjects = this.gameObjectService.getGameObjects();

    this.runGame();
  }

  runGame(): void {
    if (this._state.gameStatus != GameStatusEnum.RUNNING) {
      return;
    }

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
