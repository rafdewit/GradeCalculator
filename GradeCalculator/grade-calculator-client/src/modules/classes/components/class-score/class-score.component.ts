import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ClassScoreInfo, StudentInfo } from 'src/services/stores/models/score';

@Component({
  selector: 'app-class-score',
  templateUrl: './class-score.component.html',
  styleUrl: './class-score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassScoreComponent {
  public classScoreInfo$: Observable<ClassScoreInfo>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.classScoreInfo$ = activatedRoute.data.pipe(map(d => d['classScore']));
  }

  public studentNavigate(studentInfo: StudentInfo) {
    this.router.navigate(["../", "score-overview", studentInfo.student.id], { relativeTo: this.activatedRoute })
  }
}