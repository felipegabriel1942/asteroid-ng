import { Vector2DBuilder } from '../builder/vector-2d.builder';
import { MathUtil } from '../util/math.util';
import { Asteroid } from './asteroid';
import { State } from './state';
import { Vector2D } from './vector-2d';

export class EnemySpawner {
  private _intervalBetweenSpawns: number = 2;
  private _spawnPositions: Vector2D[] = [];
  private _hasSpawned: boolean = false;
  private _timeSinceLastSpawn: number = 0;
  private _state: State = State.getInstance();

  constructor() {
    this._spawnPositions.push(
      ...[
        new Vector2DBuilder().x(80).y(-50).build(),
        new Vector2DBuilder().x(180).y(-50).build(),
      ]
    );
  }

  public spawnEnemies() {
    if (!this._hasSpawned) {
      this._hasSpawned = true;
      this._timeSinceLastSpawn = 0;
      this._state.gameObjects.push(new Asteroid(this.getRandomSpawnPosition()));
    }

    this._timeSinceLastSpawn++;

    if (
      this._hasSpawned &&
      this._timeSinceLastSpawn / 60 > this._intervalBetweenSpawns
    ) {
      this._hasSpawned = false;
    }
  }

  private getRandomSpawnPosition(): Vector2D {
    const randomIndex = MathUtil.getRandomNumberBetweenRange(
      0,
      this._spawnPositions.length - 1
    );
    return this._spawnPositions[randomIndex];
  }
}
