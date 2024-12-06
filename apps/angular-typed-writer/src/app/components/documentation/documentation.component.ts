import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'typed-writer-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationComponent {}
