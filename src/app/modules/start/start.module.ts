import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start.component';
import { StartRoutes } from './start.routing';

@NgModule({
  imports: [CommonModule, StartRoutes],
  declarations: [StartComponent],
})
export class StartModule {}
