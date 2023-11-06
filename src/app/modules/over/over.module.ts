import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverComponent } from './over.component';
import { OverRoutes } from './over.routing';

@NgModule({
  imports: [
    CommonModule,
    OverRoutes
  ],
  declarations: [OverComponent]
})
export class OverModule { }
