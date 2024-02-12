import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'app-percentage-representation',
  templateUrl: './percentage-representation.component.html',
  styleUrl: './percentage-representation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PercentageRepresentationComponent {
  @Input() percentage: number | null;

  constructor() {

  }
}
