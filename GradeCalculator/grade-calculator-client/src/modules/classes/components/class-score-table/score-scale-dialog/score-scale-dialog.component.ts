import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, Observable, startWith } from 'rxjs';
import { ScoreScaleDialogData } from 'src/modules/classes/components/class-score-table/score-scale-dialog/score-scale-dialog.data';
import { scoreParts, simpleScoreParts } from 'src/services/angular/pipes/grade-category.pipe';

@Component({
  selector: 'app-score-scale-dialog',
  templateUrl: './score-scale-dialog.component.html',
  styleUrl: './score-scale-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScoreScaleDialogComponent {
  public controls: FormGroup<{
    totalScore: FormControl<number>;
    simpleMode: FormControl<boolean>;
    roundScores: FormControl<boolean>;
    roundByMultipleOfValue: FormControl<number>;
  }>;
  public scoreDescriptors$: Observable<ScoreDescriptor[]>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ScoreScaleDialogData, private dialogRef: MatDialogRef<ScoreScaleDialogComponent>, private formBuilder: NonNullableFormBuilder) {
    this.controls = this.formBuilder.group({
      totalScore: this.formBuilder.control<number>(20),
      simpleMode: this.formBuilder.control<boolean>(true),
      roundScores: this.formBuilder.control<boolean>(true),
      roundByMultipleOfValue: this.formBuilder.control<number>(0.5),
    });

    const formValue$ = this.controls.valueChanges.pipe(
      startWith(0),
      map(() => this.controls.value as ScoreDialogControls),
    );

    this.scoreDescriptors$ = formValue$.pipe(
      map(formValue => {
        const toUseScoreParts = formValue.simpleMode ? simpleScoreParts : scoreParts;

        const result: ScoreDescriptor[] = [];
        const firstSubResult: ScoreDescriptor = {
          minScore: formValue.roundScores ? this.roundToNearestMultiple(formValue.totalScore * 0, formValue.roundByMultipleOfValue) : formValue.totalScore * 0,
          maxScore: formValue.roundScores ? this.roundToNearestMultiple(formValue.totalScore * toUseScoreParts[0].border, formValue.roundByMultipleOfValue) : formValue.totalScore * toUseScoreParts[0].border,
          minPercentage: 0,
          maxPercentage: toUseScoreParts[0].border,
          scoreRepresentation: toUseScoreParts[0].score,
        };
        result.push(firstSubResult);

        for (let i = 0; i < toUseScoreParts.length - 2; i++) {
          const subResult: ScoreDescriptor = {
            minScore: formValue.roundScores ? this.roundToNearestMultiple(formValue.totalScore * toUseScoreParts[i].border, formValue.roundByMultipleOfValue) : formValue.totalScore * toUseScoreParts[i].border,
            maxScore: formValue.roundScores ? this.roundToNearestMultiple(formValue.totalScore * toUseScoreParts[i + 1].border, formValue.roundByMultipleOfValue) : formValue.totalScore * toUseScoreParts[i + 1].border,
            minPercentage: toUseScoreParts[i].border,
            maxPercentage: toUseScoreParts[i + 1].border,
            scoreRepresentation: toUseScoreParts[i + 1].score,
          };
          result.push(subResult);
        }

        return result.reverse();
      }),
    );
  }

  private roundToNearestMultiple(value: number, multiple: number): number {
    return Math.round(value / multiple) * multiple;
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}

export interface ScoreDialogControls {
  totalScore: number;
  simpleMode: boolean;
  roundScores: boolean;
  roundByMultipleOfValue: number;
}

export interface ScoreDescriptor {
  minScore: number;
  minPercentage: number;
  maxScore: number;
  maxPercentage: number;
  scoreRepresentation: string;
}
