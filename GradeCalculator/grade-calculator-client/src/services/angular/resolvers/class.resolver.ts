import { Injectable } from '@angular/core';
import { GradeStore } from '../../stores/grade.store';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { StudentCollection } from 'app/dtos/student-collection.model';

@Injectable({ providedIn: 'root' })
export class ClassResolver {
  constructor(private gradeStore: GradeStore) {}

  resolve(route: ActivatedRouteSnapshot): Observable<StudentCollection | null> {
    const classId = route.paramMap.get('classId') ?? '';
    return this.gradeStore.classes$.pipe(map(classes => classes.find(c => c.id === classId) ?? null));
  }
}
