import { Routes, RouterModule } from '@angular/router';
import { GameComponent } from './game.component';

const routes: Routes = [
  {
    path: '',
    component: GameComponent
  },
];

export const GameRoutes = RouterModule.forChild(routes);
