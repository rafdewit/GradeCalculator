import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { StudentCollection } from 'src/services/dtos/student-collection.model';
import { GradeStore } from 'src/services/stores/grade.store';
import { GradePeriodConfigurationService } from './grade-period-configuration.service';
import { StudentConfigurationService } from './student-configuration.service';

@Component({
  selector: 'app-class-configuration',
  templateUrl: './class-configuration.component.html',
  styleUrl: './class-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassConfigurationComponent {

  // private class$: Observable<StudentCollection>;
  public info$: Observable<ClassConfigurationInfo>;

  constructor(private activatedRoute: ActivatedRoute, private gradeStore: GradeStore,
    public gradePeriodConfigurationService: GradePeriodConfigurationService,
    public studentConfigurationService: StudentConfigurationService) {
    const class$ = this.activatedRoute.params.pipe(map(p => p['classId'])).pipe(switchMap(i => this.gradeStore.getClass(i)));

    this.info$ = class$.pipe(map(c => {
      const result: ClassConfigurationInfo = {
        class: c,
        navigationName: `Configuration(${c?.name})`
      };
      return result;
    }));
  }
}

export interface ClassConfigurationInfo {
  class: StudentCollection | null;
  navigationName: string;
}