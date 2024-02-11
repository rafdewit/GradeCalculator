import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StudentSingleGradeInfo } from 'src/services/stores/models/score';

@Component({
  selector: 'app-single-score',
  templateUrl: './single-score.component.html',
  styleUrl: './single-score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleScoreComponent { 
  @Input() singleInfo: StudentSingleGradeInfo;
  @Input() rootScore: boolean;
}
