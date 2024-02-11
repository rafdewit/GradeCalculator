import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ClassScoreInfo } from 'src/services/stores/models/score';

@Component({
  selector: 'app-class-score',
  templateUrl: './class-score.component.html',
  styleUrl: './class-score.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassScoreComponent {
  public classScoreInfo$: Observable<ClassScoreInfo>;

  constructor(activatedRoute: ActivatedRoute) {
    this.classScoreInfo$ = activatedRoute.data.pipe(map(d => d['classScore']));

    
  }
}