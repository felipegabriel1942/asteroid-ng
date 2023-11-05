import { GameRoutes } from './game.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';

@NgModule({
  imports: [
    CommonModule,
    GameRoutes
  ],
  declarations: [GameComponent]
})
export class GameModule { }
