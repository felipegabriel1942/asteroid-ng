import { GameStatusEnum } from './../../core/enum/game-status.enum';
import { State } from './../../shared/model/state';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-over',
  templateUrl: './over.component.html',
  styleUrls: ['./over.component.css'],
})
export class OverComponent implements OnInit {
  private _state: State = State.getInstance();

  constructor(private readonly router: Router) {}

  ngOnInit() {}

  public startGame(): void {
    this._state.gameStatus = GameStatusEnum.RUNNING;

    this.router.navigateByUrl('/game');
  }
}
