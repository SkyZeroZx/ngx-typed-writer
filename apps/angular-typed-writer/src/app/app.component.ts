import { Component } from '@angular/core';

@Component({
  selector: 'typed-writer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isExist = true;
  data: string[] = [
    'Friendly with Angular Universal',
    'Native Angular library for Typing Text',
    'Based in Typed.Js',
  ];
}
