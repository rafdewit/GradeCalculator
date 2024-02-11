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

  constructor(activatedRoute: ActivatedRoute) {
    this.class$ = activatedRoute.data.pipe(map(d => d['class']));
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
