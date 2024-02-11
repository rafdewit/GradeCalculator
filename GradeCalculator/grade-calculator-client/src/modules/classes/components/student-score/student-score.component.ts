import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ClassStudentInfo } from 'src/services/resolvers/student-score-info.resolver';

@Component({
  selector: 'app-student-score',
  templateUrl: './student-score.component.html',
  styleUrl: './student-score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentScoreComponent {
  public classStudentInfo$: Observable<ClassStudentInfo>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.classStudentInfo$ = activatedRoute.data.pipe(map(d => d['classStudentInfo']));
  }

  public backToScores() {
    this.router.navigate(["../../score-overview"], { relativeTo: this.activatedRoute })
  }
}
