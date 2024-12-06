import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxTypedWriterComponent } from 'ngx-typed-writer';

@Component({
  selector: 'typed-writer-smart-backspace',
  templateUrl: './smart-backspace.component.html',
  styleUrls: ['./smart-backspace.component.scss'],
  imports: [NgxTypedWriterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SmartBackspaceComponent {}
