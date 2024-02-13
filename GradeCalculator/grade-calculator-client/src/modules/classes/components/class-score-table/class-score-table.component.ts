import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, combineLatest } from 'rxjs';
import { PERCENTAGE_GRADIENT_COLORS } from 'src/services/pipes/percentage-to-color.pipe';
import { GradeStore } from 'src/services/stores/grade.store';
import { ClassScoreInfo, StudentInfo } from 'src/services/stores/models/score';

@Component({
  selector: 'app-class-score-table',
  templateUrl: './class-score-table.component.html',
  styleUrl: './class-score-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassScoreTableComponent {
  public classScoreInfo$: Observable<ClassScoreInfo | null>;
  public info$: Observable<ClassTableComponentInfo>;
  public colors = PERCENTAGE_GRADIENT_COLORS;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private gradeStore: GradeStore) {
    const classId$ = this.activatedRoute.params.pipe(map(p => p['classId'] as string));
    this.classScoreInfo$ = combineLatest(([classId$, this.gradeStore.classScoreInfos$]))
      .pipe(map(([classId, classScoreInfos]) => {
        const classInfo = classScoreInfos.find(c => c.class.id === classId) ?? null;
        return classInfo;
      }));

    this.info$ = this.classScoreInfo$.pipe(map(c => {
      const result: ClassTableComponentInfo = {
        classScoreInfo: c,
        navigationName: `Table(${c?.class?.name})`
      };
      return result;
    }));
  }

  public studentNavigate(studentInfo: StudentInfo) {
    this.router.navigate(["../", "score-overview", studentInfo.student.id], { relativeTo: this.activatedRoute })
  }
}

export interface ClassTableComponentInfo {
  classScoreInfo: ClassScoreInfo | null;
  navigationName: string;
}