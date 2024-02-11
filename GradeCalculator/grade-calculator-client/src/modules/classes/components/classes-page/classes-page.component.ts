import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentCollection } from 'src/services/dtos/student-collection.model';
import { GradeStore } from 'src/services/stores/grade.store';

@Component({
  selector: 'app-classes-page',
  templateUrl: './classes-page.component.html',
  styleUrl: './classes-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassesPageComponent {
  constructor(public gradeStore: GradeStore, private router: Router, private activatedRoute: ActivatedRoute) {
    
  }

  public copyClass(studentCollection: StudentCollection): void {
    //
  }

  public deleteClass(studentCollection: StudentCollection): void {
    //
  }

  public classClicked(studentCollection: StudentCollection): void {
    this.router.navigate([studentCollection.id, "score-overview"], { relativeTo: this.activatedRoute })
  }

  public editClicked(studentCollection: StudentCollection): void {
    this.router.navigate([studentCollection.id], { relativeTo: this.activatedRoute });
  }

  public openCreateClassDialog(): void {
    
  }
}
