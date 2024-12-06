import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxTypedWriterComponent } from 'ngx-typed-writer';

@Component({
  selector: 'typed-writer-shuffled',
  templateUrl: './shuffled.component.html',
  styleUrls: ['./shuffled.component.scss'],
  imports: [NgxTypedWriterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShuffledComponent {}
