import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { GradePeriod } from 'src/services/dtos/grade-config/grade-period.model';
import { StudentCollection } from 'src/services/dtos/student-collection.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-period-page',
  templateUrl: './period-page.component.html',
  styleUrl: './period-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodPageComponent {

  public info$: Observable<PeriodPageInfo>;

  constructor(activatedRoute: ActivatedRoute, private matDialog: MatDialog) {
    this.info$ = activatedRoute.data.pipe(map(d => {
      const result: PeriodPageInfo = {
        class: d['class'],
        period: d['period']
      };

      return result;
    }));
  }
}

export interface PeriodPageInfo {
  class: StudentCollection;
  period: GradePeriod;
}
