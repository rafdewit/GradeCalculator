import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StudentMultiGradeInfo } from 'src/services/stores/models/score';

@Component({
  selector: 'app-multi-score',
  templateUrl: './multi-score.component.html',
  styleUrl: './multi-score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiScoreComponent {
  @Input() multiInfo: StudentMultiGradeInfo;
  @Input() rootScore: boolean;
}
