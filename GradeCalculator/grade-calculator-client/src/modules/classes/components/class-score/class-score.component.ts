import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { StudentCollection } from 'src/services/dtos/student-collection.model';

@Component({
  selector: 'app-class-score',
  templateUrl: './class-score.component.html',
  styleUrl: './class-score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassScoreComponent {
  public class$: Observable<StudentCollection>;

  constructor(activatedRoute: ActivatedRoute) {
    this.class$ = activatedRoute.data.pipe(map(d => d['class']));
  }
}