import { Routes, RouterModule } from '@angular/router';
import { OverComponent } from './over.component';

const routes: Routes = [{ path: '', component: OverComponent }];

export const OverRoutes = RouterModule.forChild(routes);
