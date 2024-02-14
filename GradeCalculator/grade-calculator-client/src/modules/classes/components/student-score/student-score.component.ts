import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest, map } from 'rxjs';
import { ClassStudentInfo } from 'src/services/angular/resolvers/student-score-info.resolver';
import { GradeStore } from 'src/services/stores/grade.store';

@Component({
  selector: 'app-student-score',
  templateUrl: './student-score.component.html',
  styleUrl: './student-score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentScoreComponent {
  public classStudentInfo$: Observable<ClassStudentInfo>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private gradeStore: GradeStore) {
    const classId$ = this.activatedRoute.params.pipe(map(p => p['classId'] as string));
    const studentId$ = this.activatedRoute.params.pipe(map(p => p['studentId'] as string));
    
    this.classStudentInfo$ = combineLatest(([classId$, studentId$, this.gradeStore.classScoreInfos$]))
      .pipe(map(([classId, studentId, classScoreInfos]) => {
        const classInfo = classScoreInfos.find(c => c.class.id === classId) ?? null;
        const studentInfo = classInfo?.studentInfos.find(i => i.student.id === studentId) ?? null

        const result: ClassStudentInfo = {
          classInfo: classInfo,
          studentInfo: studentInfo
        };
  
        return result;
      }));
  }

  public backToScores() {
    this.router.navigate(["../../score-overview"], { relativeTo: this.activatedRoute })
  }
}
