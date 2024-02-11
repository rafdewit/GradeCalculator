import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { StudentCollection } from 'src/services/dtos/student-collection.model';

@Component({
  selector: 'app-class-configuration',
  templateUrl: './class-configuration.component.html',
  styleUrl: './class-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassConfigurationComponent { 

  public class$: Observable<StudentCollection>;

  constructor(activatedRoute: ActivatedRoute) {
    this.class$ = activatedRoute.data.pipe(map(d => d['class']));
  }
}
