import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { GradePeriod } from 'src/services/dtos/grade-config/grade-period.model';
import { StudentCollection } from 'src/services/dtos/student-collection.model';
import { Student } from 'src/services/dtos/students/student.model';

@Component({
  selector: 'app-class-configuration',
  templateUrl: './class-configuration.component.html',
  styleUrl: './class-configuration.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassConfigurationComponent { 

  public class$: Observable<StudentCollection>;
  public info$: Observable<ClassConfigurationInfo>;

  constructor(activatedRoute: ActivatedRoute) {
    this.class$ = activatedRoute.data.pipe(map(d => d['class']));
    this.info$ = this.class$.pipe(map(c => {
      const result: ClassConfigurationInfo = {
        class: c,
        navigationName: `Configuration(${c.name})`
      };
      return result;
    }))
  }

  public openCreatePeriodDialog(): void {

  }

  public periodClicked(gradePeriod: GradePeriod): void {

  }

  public copyPeriod(gradePeriod: GradePeriod, studentCollection: StudentCollection): void {

  }

  public deletePeriod(gradePeriod: GradePeriod, studentCollection: StudentCollection): void {

  }

  public openCreateStudentDialog(): void {

  }

  public deleteStudent(student: Student, studentCollection: StudentCollection): void {

  }
}

export interface ClassConfigurationInfo {
  class: StudentCollection;
  navigationName: string;
}