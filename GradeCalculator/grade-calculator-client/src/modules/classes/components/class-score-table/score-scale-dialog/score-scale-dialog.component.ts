import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, NonNullableFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { ScoreScaleDialogData } from 'src/modules/classes/components/class-score-table/score-scale-dialog/score-scale-dialog.data';
import { scoreParts } from 'src/services/angular/pipes/grade-category.pipe';

@Component({
  selector: 'app-score-scale-dialog',
  templateUrl: './score-scale-dialog.component.html',
  styleUrl: './score-scale-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreScaleDialogComponent {
  public totalScoreFormControl: FormControl<number>;
  public scoreDescriptors$: Observable<ScoreDescriptor[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ScoreScaleDialogData, private dialogRef: MatDialogRef<ScoreScaleDialogComponent>, private formBuilder: NonNullableFormBuilder) {
    this.totalScoreFormControl = this.formBuilder.control<number>(20);

    const formValue$ = this.totalScoreFormControl.valueChanges.pipe(
      startWith(0),
      map(() => this.totalScoreFormControl.value),
    );
    this.scoreDescriptors$ = formValue$.pipe(
      map(formValue => {
        const result: ScoreDescriptor[] = [];
        const firstSubResult: ScoreDescriptor = {
          minScore: formValue * 0,
          minPercentage: 0,
          maxScore: formValue * scoreParts[0].border,
          maxPercentage: scoreParts[0].border,
          scoreRepresentation: scoreParts[0].score,
        };
        result.push(firstSubResult);

        for (let i = 0; i < scoreParts.length - 2; i++) {
          const subResult: ScoreDescriptor = {
            minScore: formValue * scoreParts[i].border,
            minPercentage: scoreParts[i].border,
            maxScore: formValue * scoreParts[i + 1].border,
            maxPercentage: scoreParts[i + 1].border,
            scoreRepresentation: scoreParts[i + 1].score,
          };
          result.push(subResult);
        }

        return result;
      }),
    );
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}

export class ScoreDescriptor {
  minScore: number;
  minPercentage: number;
  maxScore: number;
  maxPercentage: number;
  scoreRepresentation: string;
}
