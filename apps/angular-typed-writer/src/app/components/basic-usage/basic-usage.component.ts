import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgxTypedWriterComponent } from 'ngx-typed-writer';

@Component({
  selector: 'typed-writer-basic-usage',
  templateUrl: './basic-usage.component.html',
  styleUrls: ['./basic-usage.component.scss'],
  imports: [NgxTypedWriterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicUsageComponent {}
