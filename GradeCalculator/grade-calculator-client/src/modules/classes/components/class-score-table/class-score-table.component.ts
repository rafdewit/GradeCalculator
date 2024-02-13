import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, combineLatest, startWith } from 'rxjs';
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

  public studentNameFilterFormControl: FormControl<string>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private gradeStore: GradeStore, private formBuilder: NonNullableFormBuilder) {
    this.studentNameFilterFormControl = this.formBuilder.control('');
    const classId$ = this.activatedRoute.params.pipe(map(p => p['classId'] as string));

    this.classScoreInfo$ = combineLatest(([classId$, this.gradeStore.classScoreInfos$]))
      .pipe(map(([classId, classScoreInfos]) => {
        const classInfo = classScoreInfos.find(c => c.class.id === classId) ?? null;
        return classInfo;
      }));

    const studentNameFilter$ = this.studentNameFilterFormControl.valueChanges.pipe(startWith(''), map(() => this.studentNameFilterFormControl.value));
    this.info$ = combineLatest([this.classScoreInfo$, studentNameFilter$]).pipe(map(([classInfo, studentNameFilter]) => {

      const studentNameFilterLow = studentNameFilter.toLowerCase();
      const filteredStudentInfos = classInfo?.studentInfos.filter(s => s.student.name.toLowerCase().includes(studentNameFilterLow)) ?? [];

      const result: ClassTableComponentInfo = {
        classScoreInfo: classInfo,
        navigationName: `Table(${classInfo?.class?.name})`,
        filteredStudentInfos: filteredStudentInfos
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
  filteredStudentInfos: StudentInfo[]
}