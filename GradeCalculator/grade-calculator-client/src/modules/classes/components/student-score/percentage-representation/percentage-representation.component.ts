import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { PERCENTAGE_GRADIENT_COLORS } from 'src/services/pipes/percentage-to-color.pipe';
@Component({
  selector: 'app-percentage-representation',
  templateUrl: './percentage-representation.component.html',
  styleUrl: './percentage-representation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PercentageRepresentationComponent {
  @Input() percentage: number | null;

  public colors = PERCENTAGE_GRADIENT_COLORS;

  constructor() {
    
  }
}
