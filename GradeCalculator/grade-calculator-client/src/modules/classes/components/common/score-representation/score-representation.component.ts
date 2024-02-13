import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-score-representation',
  templateUrl: './score-representation.component.html',
  styleUrl: './score-representation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreRepresentationComponent {
  @Input() percentage: number | null;
  @Input() score: number | null;
  @Input() total: number | null;
  @Input() mode: 'percentage' | 'category' | 'score';
}
