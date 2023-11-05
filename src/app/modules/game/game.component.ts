import { Component, OnInit } from '@angular/core';

import { State } from './../../shared/model/state';
import { Player } from './../../shared/model/player';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  private _state: State = State.getInstance();
  private _player: Player = Player.getInstance();

  constructor() {}

  ngOnInit() {}

  public get score(): string {
    return this._state.score.toString().padStart(10, '0');
  }

  public get lives(): string {
    return this._player.lives.toString();
  }
}
