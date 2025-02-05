import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { GradeStore } from 'src/services/stores/grade.store';
import { StudentCollection } from 'app/dtos/student-collection.model';
import { GradePeriod } from 'app/dtos/grade-config/grade-period.model';

@Component({
  selector: 'app-period-page',
  templateUrl: './period-page.component.html',
  styleUrl: './period-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodPageComponent {
  public info$: Observable<PeriodPageInfo>;

  constructor(private activatedRoute: ActivatedRoute, private matDialog: MatDialog, private gradeStore: GradeStore) {
    const class$ = this.activatedRoute.params.pipe(map(p => p['classId'])).pipe(switchMap(i => this.gradeStore.getClass(i)));
    const periodId$ = this.activatedRoute.params.pipe(map(p => p['periodId'] as string));

    this.info$ = combineLatest([class$, periodId$]).pipe(
      map(([studentCollection, periodId]) => {
        const result: PeriodPageInfo = {
          class: studentCollection,
          period: studentCollection?.gradePeriods.find(p => p.id === periodId) ?? null,
        };

        return result;
      }),
    );
  }
}

export interface PeriodPageInfo {
  class: StudentCollection | null;
  period: GradePeriod | null;
}
