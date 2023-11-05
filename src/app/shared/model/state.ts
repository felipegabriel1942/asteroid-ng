import { GameStatusEnum } from './../../core/enum/game-status.enum';
import type { GameObject } from './game-object';

export class State {
  public gameObjects: GameObject[] = [];
  public gameStatus: GameStatusEnum = GameStatusEnum.RUNNING;
  public score: number = 0;

  private static instance: State;

  private constructor() {}

  public static getInstance(): State {
    if (!State.instance) {
      State.instance = new State();
    }

    return State.instance;
  }
}
