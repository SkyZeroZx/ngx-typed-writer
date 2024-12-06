import { NgxTypedWriterComponent } from 'ngx-typed-writer';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import {
  BasicUsageComponent,
  DocumentationComponent,
  FadeOutComponent,
  ShuffledComponent,
  SmartBackspaceComponent,
} from './components';

@Component({
  selector: 'typed-writer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    BasicUsageComponent,
    DocumentationComponent,
    FadeOutComponent,
    ShuffledComponent,
    SmartBackspaceComponent,
    NgxTypedWriterComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  data = signal<string[]>([
    'Friendly with Angular Universal',
    'Native Angular library for Typing Text',
    'Based in Typed.Js',
  ]);
}
