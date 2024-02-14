import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditStudentsSingleScoreDialogData } from './edit-students-single-score-dialog.data';
import { DefaultCrudDialogData } from 'src/modules/common-module/dialogs/default-dialog-crud.data';

@Component({
  selector: 'app-edit-students-single-score-dialog',
  templateUrl: './edit-students-single-score-dialog.component.html',
  styleUrl: './edit-students-single-score-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditStudentsSingleScoreDialogComponent {

  public studentGradesFormArray: FormArray<StudentSingleScoreFormGroup>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DefaultCrudDialogData<EditStudentsSingleScoreDialogData>, private dialogRef: MatDialogRef<EditStudentsSingleScoreDialogComponent>, private formBuilder: NonNullableFormBuilder) {
    this.studentGradesFormArray = this.formBuilder.array<StudentSingleScoreFormGroup>([]);

    let i = 0;
    data.object.classScoreInfo.studentInfos.forEach(s => {
      const studentGrade = s.student.studentSingleGrades?.find(g => g.singleGradeConfigurationId === data.object.single.id);

      const studentSingleScoreFormGroup: StudentSingleScoreFormGroup = this.formBuilder.group({
        studentId: this.formBuilder.control(s.student.id),
        studentName: this.formBuilder.control(s.student.name),
        score: this.formBuilder.control(studentGrade?.score ?? null)
      });

      this.studentGradesFormArray.insert(i, studentSingleScoreFormGroup);
      i++;
    });
  }

  public acceptChanges(): void {
    this.dialogRef.close(this.studentGradesFormArray.value);
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  public deleteItem(): void {
    this.data.deleteFlag = true;
    this.dialogRef.close();
  }
}

export class StudentSingleScoreFormGroup extends FormGroup<{
  studentId: FormControl<string>,
  studentName: FormControl<string>,
  score: FormControl<number | null>
}>{}