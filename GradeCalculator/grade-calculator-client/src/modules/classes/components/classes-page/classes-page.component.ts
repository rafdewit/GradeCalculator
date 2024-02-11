import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StudentCollection } from 'src/services/dtos/student-collection.model';
import { GradeStore } from 'src/services/stores/grade.store';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrl: './classes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesPageComponent {
  constructor(public gradeStore: GradeStore) {
    
  }

  public copyClass(studentCollection: StudentCollection): void {
    //
  }

  public deleteClass(studentCollection: StudentCollection): void {
    //
  }
}
