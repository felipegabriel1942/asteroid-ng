import { Injectable } from '@angular/core';
import { GameObject } from 'src/app/shared/model/game-object';
import { Player } from 'src/app/shared/model/player';

@Injectable({
  providedIn: 'root',
})
export class GameObjectService {
  constructor() {}

  public getGameObjects(): GameObject[] {
    return [Player.getInstance()];
  }
}
