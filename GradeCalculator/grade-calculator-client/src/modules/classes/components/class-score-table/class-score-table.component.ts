import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, combineLatest, startWith, firstValueFrom } from 'rxjs';
import { PERCENTAGE_GRADIENT_COLORS } from 'src/services/pipes/percentage-to-color.pipe';
import { GradeStore } from 'src/services/stores/grade.store';
import { ClassScoreInfo, StudentInfo, StudentMultiGradeInfo } from 'src/services/stores/models/score';
import { EditStudentsSingleScoreDialogData } from './edit-students-single-score-dialog/edit-students-single-score-dialog.data';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';
import { EditStudentsSingleScoreDialogComponent } from './edit-students-single-score-dialog/edit-students-single-score-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SingleGradeConfiguration } from 'src/services/dtos/grade-config/single-grade-configuration.model';
import { SingleGradeUpdateDto } from 'src/services/api/request/grade-update/single-grade-update';
import { SingleGradesUpdateDto } from 'src/services/api/request/grade-update/single-grades-update';
import { SingleGradeWebClient } from 'src/services/api/single-grade-web-client';
import { MultiGradeConfiguration } from 'src/services/dtos/grade-config/multi-grade-configuration.model';
import { SingleGradeConfigDialogService } from 'src/services/dialog/single-grade-config-dialog.service';
import { GradePeriod } from 'src/services/dtos/grade-config/grade-period.model';

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
  public scoreDisplayTypeFormControl: FormControl<'percentage' | 'category' | 'score'>;
  public enableWeightFormControl: FormControl<boolean>;
  public rootOnlyFormControl: FormControl<boolean>;
  public showButtonsFormControl: FormControl<boolean>;

  public scoreDisplayTypeOptions: string[] = ['percentage' , 'category' , 'score'];

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private gradeStore: GradeStore, private formBuilder: NonNullableFormBuilder,
    private matDialog: MatDialog, private singleGradeWebClient: SingleGradeWebClient, private singleGradeConfigDialogService: SingleGradeConfigDialogService) {
    this.studentNameFilterFormControl = this.formBuilder.control('');
    this.enableWeightFormControl = this.formBuilder.control(true);
    this.scoreDisplayTypeFormControl = this.formBuilder.control('score');
    this.rootOnlyFormControl = this.formBuilder.control(true);
    this.showButtonsFormControl = this.formBuilder.control(true);

    const classId$ = this.activatedRoute.params.pipe(map(p => p['classId'] as string));

    this.classScoreInfo$ = combineLatest(([classId$, this.gradeStore.classScoreInfos$]))
      .pipe(map(([classId, classScoreInfos]) => {
        const classInfo = classScoreInfos.find(c => c.class.id === classId) ?? null;
        return classInfo;
      }));

      const studentNameFilter$ = this.studentNameFilterFormControl.valueChanges.pipe(startWith(''), map(() => this.studentNameFilterFormControl.value));
      const enableWeight$ = this.enableWeightFormControl.valueChanges.pipe(startWith(''), map(() => this.enableWeightFormControl.value));
      const scoreDisplayType$ = this.scoreDisplayTypeFormControl.valueChanges.pipe(startWith(''), map(() => this.scoreDisplayTypeFormControl.value));
      const rootOnly$ = this.rootOnlyFormControl.valueChanges.pipe(startWith(''), map(() => this.rootOnlyFormControl.value));
      const showButtons$ = this.showButtonsFormControl.valueChanges.pipe(startWith(''), map(() => this.showButtonsFormControl.value));

    this.info$ = combineLatest([this.classScoreInfo$, studentNameFilter$, enableWeight$, scoreDisplayType$, rootOnly$, showButtons$]).pipe(map(([classInfo, studentNameFilter, enableWeight, scoreDisplayType, rootOnly, showButtons]) => {

      const studentNameFilterLow = studentNameFilter.toLowerCase();
      const filteredStudentInfos = classInfo?.studentInfos.filter(s => s.student.name.toLowerCase().includes(studentNameFilterLow)) ?? [];

      const result: ClassTableComponentInfo = {
        classScoreInfo: classInfo,
        navigationName: `Table(${classInfo?.class?.name})`,
        filteredStudentInfos: filteredStudentInfos,
        enableWeight: enableWeight,
        scoreDisplayType: scoreDisplayType,
        rootOnly: rootOnly,
        showButtons: showButtons
      };
      return result;
    }));
  }

  public studentNavigate(studentInfo: StudentInfo) {
    this.router.navigate(["../", "score-overview", studentInfo.student.id], { relativeTo: this.activatedRoute })
  }

  public async addSingle(multi: MultiGradeConfiguration, classScoreInfo: ClassScoreInfo, gradePeriod: GradePeriod): Promise<void> {
    await this.singleGradeConfigDialogService.createSingleGrade(classScoreInfo.class.id, gradePeriod.id, multi.id);
  }

  public async editSingle(single: SingleGradeConfiguration, classScoreInfo: ClassScoreInfo): Promise<void> {
    const data: DefaultCrudDialogData<EditStudentsSingleScoreDialogData> = {
      object: {
        single: single,
        classScoreInfo: classScoreInfo
      },
      deleteFlag: false,
      title: `Update Score: ${single.name}`,
      cancelFlag: false,
      isUpdate: true
    }

    const input = new MatDialogConfig<DefaultCrudDialogData<EditStudentsSingleScoreDialogData>>();
    input.data = data;

    const dialogRef = this.matDialog.open<EditStudentsSingleScoreDialogComponent, DefaultCrudDialogData<EditStudentsSingleScoreDialogData>, SingleGradeUpdateDto[]>(EditStudentsSingleScoreDialogComponent, input);
    const result = await firstValueFrom(dialogRef.afterClosed()) ?? null;

    if(result) {
      const request: SingleGradesUpdateDto = {
        singleGradeConfigurationId: single.id,
        singleGradeUpdates: result.filter(r => r.score !== null),
        studentCollectionId: classScoreInfo.class.id
      };

      await firstValueFrom(this.singleGradeWebClient.updateSingleGrades(request));
    }
  }
}

export interface ClassTableComponentInfo {
  classScoreInfo: ClassScoreInfo | null;
  navigationName: string;
  filteredStudentInfos: StudentInfo[]
  enableWeight: boolean;
  scoreDisplayType: 'percentage' | 'category' | 'score';
  rootOnly: boolean;
  showButtons: boolean;
}