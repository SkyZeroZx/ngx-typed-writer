import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxTypedWriterComponent } from 'ngx-typed-writer';

@Component({
  selector: 'typed-writer-fade-out',
  templateUrl: './fade-out.component.html',
  styleUrls: ['./fade-out.component.scss'],
  imports: [NgxTypedWriterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FadeOutComponent {}
