import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, combineLatest, startWith, firstValueFrom, takeUntil, Subject } from 'rxjs';
import { PERCENTAGE_GRADIENT_COLORS } from 'src/services/angular/pipes/percentage-to-color.pipe';
import { GradeStore } from 'src/services/stores/grade.store';
import { ClassScoreInfo, StudentInfo, StudentMultiGradeInfo } from 'src/services/stores/models/score';
import { EditStudentsSingleScoreDialogData } from './edit-students-single-score-dialog/edit-students-single-score-dialog.data';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';
import { EditStudentsSingleScoreDialogComponent } from './edit-students-single-score-dialog/edit-students-single-score-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SingleGradeConfiguration } from 'src/services/dtos/grade-config/single-grade-configuration.model';
import { SingleGradeUpdateDto } from 'src/services/communication/api/request/grade-update/single-grade-update';
import { SingleGradesUpdateDto } from 'src/services/communication/api/request/grade-update/single-grades-update';
import { MultiGradeConfiguration } from 'src/services/dtos/grade-config/multi-grade-configuration.model';
import { SingleGradeConfigDialogService } from 'src/services/angular/dialog/single-grade-config-dialog.service';
import { GradePeriod } from 'src/services/dtos/grade-config/grade-period.model';
import { MultiGradeConfigDialogService } from 'src/services/angular/dialog/multi-grade-config-dialog.service';
import { ISingleGradeClient } from 'src/services/communication/api/base/single-grade-client.interface';
import { alphabetically } from 'src/services/stores/grade.converter';
import { StudentConfigurationService } from '../class-configuration/student-configuration.service';
import { GradePeriodConfigurationService } from '../class-configuration/grade-period-configuration.service';
import { ThemeSelectorService } from 'src/modules/common-module/theme/theme-selector/theme-selector.service';

@Component({
  selector: 'app-class-score-table',
  templateUrl: './class-score-table.component.html',
  styleUrl: './class-score-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassScoreTableComponent implements OnDestroy {
  public classScoreInfo$: Observable<ClassScoreInfo | null>;
  public info$: Observable<ClassTableComponentInfo>;
  public colors = PERCENTAGE_GRADIENT_COLORS;

  private _onDestroy = new Subject<void>();

  public filterFormGroup: FormGroup<{
    studentNameFilter: FormControl<string>;
    scoreDisplayType: FormControl<'percentage' | 'category' | 'score'>;
    enableMove: FormControl<boolean>;
    enableWeight: FormControl<boolean>;
    rootOnly: FormControl<boolean>;
    showCreateAndScoreButtons: FormControl<boolean>;
    showEditButtons: FormControl<boolean>;
    showDeleteButtons: FormControl<boolean>;
    sortByScore: FormControl<boolean>;
    gradePeriodFilter: FormControl<string[]>;
  }>;

  public scoreDisplayTypeOptions: string[] = ['percentage', 'category', 'score'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gradeStore: GradeStore,
    private formBuilder: NonNullableFormBuilder,
    private matDialog: MatDialog,
    private singleGradeClient: ISingleGradeClient,
    private singleGradeConfigDialogService: SingleGradeConfigDialogService,
    private multiGradeConfigDialogService: MultiGradeConfigDialogService,
    public gradePeriodConfigurationService: GradePeriodConfigurationService,
    public studentConfigurationService: StudentConfigurationService,
    public themeSelectorService: ThemeSelectorService,
  ) {
    this.filterFormGroup = this.formBuilder.group({
      studentNameFilter: this.formBuilder.control<string>(''),
      scoreDisplayType: this.formBuilder.control<'percentage' | 'category' | 'score'>('score'),
      enableMove: this.formBuilder.control<boolean>(false),
      enableWeight: this.formBuilder.control<boolean>(true),
      rootOnly: this.formBuilder.control<boolean>(true),
      showCreateAndScoreButtons: this.formBuilder.control<boolean>(true),
      showEditButtons: this.formBuilder.control<boolean>(true),
      showDeleteButtons: this.formBuilder.control<boolean>(false),
      sortByScore: this.formBuilder.control<boolean>(false),
      gradePeriodFilter: this.formBuilder.control<string[]>([]),
    });

    const classId$ = this.activatedRoute.params.pipe(map(p => p['classId'] as string));
    classId$.pipe(takeUntil(this._onDestroy)).subscribe(classId => {
      const serializedFilter = localStorage.getItem(`filter-${classId}`);
      if (serializedFilter) {
        const filter = JSON.parse(serializedFilter) as TableFilter;
        if (filter) {
          this.filterFormGroup.setValue(filter);
        }
      }
    });

    this.classScoreInfo$ = combineLatest([classId$, this.gradeStore.classScoreInfos$]).pipe(
      map(([classId, classScoreInfos]) => {
        const classInfo = classScoreInfos.find(c => c.class.id === classId) ?? null;
        return classInfo;
      }),
    );

    const filter$ = this.filterFormGroup.valueChanges.pipe(
      startWith(''),
      map(() => this.filterFormGroup.value),
    );

    this.info$ = combineLatest([this.classScoreInfo$, filter$, themeSelectorService.selectedTheme$]).pipe(
      map(([classInfo, filter, theme]) => {
        const tableFilter = filter as TableFilter;
        localStorage.setItem(`filter-${classInfo?.class.id}`, JSON.stringify(tableFilter));

        const studentNameFilterLow = tableFilter.studentNameFilter.toLowerCase();

        const filteredStudentInfos = filter.sortByScore
          ? classInfo?.studentInfos.filter(s => s.student.name.toLowerCase().includes(studentNameFilterLow)).sort((a, b) => alphabetically(false, a.totalPercentage, b.totalPercentage)) ?? []
          : classInfo?.studentInfos.filter(s => s.student.name.toLowerCase().includes(studentNameFilterLow)) ?? [];

        const result: ClassTableComponentInfo = {
          classScoreInfo: classInfo,
          navigationName: `Table(${classInfo?.class?.name})`,
          filteredStudentInfos: filteredStudentInfos,
          enableMove: tableFilter.enableMove,
          enableWeight: tableFilter.enableWeight,
          scoreDisplayType: tableFilter.scoreDisplayType,
          rootOnly: tableFilter.rootOnly,
          showCreateAndScoreButtons: tableFilter.showCreateAndScoreButtons,
          showDeleteButtons: tableFilter.showDeleteButtons,
          showEditButtons: tableFilter.showEditButtons,
          sortByScore: tableFilter.sortByScore,
          gradePeriodFilter: new Set<string>(tableFilter.gradePeriodFilter),
          themeClass: theme.class,
        };
        return result;
      }),
    );
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  public studentNavigate(studentInfo: StudentInfo) {
    this.router.navigate(['../', 'score-overview', studentInfo.student.id], {
      relativeTo: this.activatedRoute,
    });
  }

  public async moveGradePeriod(classScoreInfo: ClassScoreInfo, gradePeriod: GradePeriod, left: boolean): Promise<void> {
    await this.gradePeriodConfigurationService.movePeriod(classScoreInfo.class.id, gradePeriod, left);
  }

  public async moveMulti(classScoreInfo: ClassScoreInfo, multi: MultiGradeConfiguration, gradePeriod: GradePeriod, left: boolean): Promise<void> {
    await this.multiGradeConfigDialogService.moveMulti(classScoreInfo.class.id, multi, left);
  }

  public async moveSingle(classScoreInfo: ClassScoreInfo, single: SingleGradeConfiguration, gradePeriod: GradePeriod, left: boolean): Promise<void> {
    await this.singleGradeConfigDialogService.moveSingle(classScoreInfo.class.id, single, left);
  }

  public async dragDialogMulti(classScoreInfo: ClassScoreInfo, multi: MultiGradeConfiguration, gradePeriod: GradePeriod): Promise<void> {
    console.log(multi);
  }

  public async dragDialogSingle(classScoreInfo: ClassScoreInfo, single: SingleGradeConfiguration, gradePeriod: GradePeriod): Promise<void> {
    console.log(single);
  }

  public async deleteSingleGradeConfig(classScoreInfo: ClassScoreInfo, single: SingleGradeConfiguration): Promise<void> {
    await this.singleGradeConfigDialogService.deleteSingleGrade(classScoreInfo.class.id, single);
  }

  public async deleteMultiGradeConfig(classScoreInfo: ClassScoreInfo, multi: MultiGradeConfiguration): Promise<void> {
    await this.multiGradeConfigDialogService.deleteMultiGrade(classScoreInfo.class.id, multi);
  }

  public async editSingleGradeConfig(classScoreInfo: ClassScoreInfo, single: SingleGradeConfiguration): Promise<void> {
    await this.singleGradeConfigDialogService.updateSingleGrade(classScoreInfo.class.id, single);
  }

  public async editMultiGradeConfig(classScoreInfo: ClassScoreInfo, multi: MultiGradeConfiguration): Promise<void> {
    await this.multiGradeConfigDialogService.updateMultiGrade(classScoreInfo.class.id, multi);
  }

  public async addSingleToGradePeriod(classScoreInfo: ClassScoreInfo, gradePeriod: GradePeriod): Promise<void> {
    await this.singleGradeConfigDialogService.createSingleGrade(classScoreInfo.class.id, gradePeriod.id, null);
    this.disableRootOnlyIfEnabled();
  }

  public async addMultiToGradePeriod(classScoreInfo: ClassScoreInfo, gradePeriod: GradePeriod): Promise<void> {
    await this.multiGradeConfigDialogService.createMultiGrade(classScoreInfo.class.id, gradePeriod.id, null);
    this.disableRootOnlyIfEnabled();
  }

  public async addSingle(multi: MultiGradeConfiguration, classScoreInfo: ClassScoreInfo, gradePeriod: GradePeriod): Promise<void> {
    await this.singleGradeConfigDialogService.createSingleGrade(classScoreInfo.class.id, gradePeriod.id, multi.id);
    this.disableRootOnlyIfEnabled();
  }

  public async addMulti(multi: MultiGradeConfiguration, classScoreInfo: ClassScoreInfo, gradePeriod: GradePeriod): Promise<void> {
    await this.multiGradeConfigDialogService.createMultiGrade(classScoreInfo.class.id, gradePeriod.id, multi.id);
    this.disableRootOnlyIfEnabled();
  }

  private disableRootOnlyIfEnabled() {
    if (this.filterFormGroup.controls.rootOnly.value) {
      this.filterFormGroup.controls.rootOnly.setValue(false);
    }
  }

  public async editSingle(single: SingleGradeConfiguration, classScoreInfo: ClassScoreInfo): Promise<void> {
    const data: DefaultCrudDialogData<EditStudentsSingleScoreDialogData> = {
      object: {
        single: single,
        classScoreInfo: classScoreInfo,
      },
      deleteFlag: false,
      title: `Update Score: ${single.name}`,
      cancelFlag: false,
      isUpdate: true,
    };

    const input = new MatDialogConfig<DefaultCrudDialogData<EditStudentsSingleScoreDialogData>>();
    input.data = data;

    const dialogRef = this.matDialog.open<EditStudentsSingleScoreDialogComponent, DefaultCrudDialogData<EditStudentsSingleScoreDialogData>, SingleGradeUpdateDto[]>(EditStudentsSingleScoreDialogComponent, input);
    const result = (await firstValueFrom(dialogRef.afterClosed())) ?? null;

    if (result) {
      const request: SingleGradesUpdateDto = {
        singleGradeConfigurationId: single.id,
        singleGradeUpdates: result,
        studentCollectionId: classScoreInfo.class.id,
      };

      await firstValueFrom(this.singleGradeClient.updateSingleGrades(request));
    }
  }
}

export interface ClassTableComponentInfo {
  classScoreInfo: ClassScoreInfo | null;
  navigationName: string;
  filteredStudentInfos: StudentInfo[];
  enableWeight: boolean;
  enableMove: boolean;
  scoreDisplayType: 'percentage' | 'category' | 'score';
  rootOnly: boolean;
  showCreateAndScoreButtons: boolean;
  showEditButtons: boolean;
  showDeleteButtons: boolean;
  sortByScore: boolean;
  gradePeriodFilter: Set<string>;
  themeClass: string;
}

export interface TableFilter {
  studentNameFilter: string;
  scoreDisplayType: 'percentage' | 'category' | 'score';
  enableWeight: boolean;
  enableMove: boolean;
  rootOnly: boolean;
  showCreateAndScoreButtons: boolean;
  showEditButtons: boolean;
  showDeleteButtons: boolean;
  sortByScore: boolean;
  gradePeriodFilter: string[];
}
