import { Component, HostListener, OnInit } from '@angular/core';

import { Control } from './shared/model/control';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'asteroid-ng';

  // TODO: MOVER LOGICA PARA OUTRAS CLASSES
  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  captureInput(event: KeyboardEvent): void {
    const control = Control.getInstance();

    if (event.code == 'Space') {
      control.shoot = event.type === 'keydown';
    }

    if (event.code == 'KeyD') {
      control.right = event.type === 'keydown';
    }

    if (event.code == 'KeyA') {
      control.left = event.type === 'keydown';
    }
  }

  constructor() {}

  ngOnInit(): void {}
}
