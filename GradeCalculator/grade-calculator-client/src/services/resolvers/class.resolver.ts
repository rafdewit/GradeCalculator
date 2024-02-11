import { Injectable } from "@angular/core";
import { GradeStore } from "../stores/grade.store";
import { ActivatedRouteSnapshot } from "@angular/router";
import { StudentCollection } from "../dtos/student-collection.model";
import { firstValueFrom, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ClassResolver  {
  constructor(private gradeStore: GradeStore) {}

    resolve(route: ActivatedRouteSnapshot): Promise<StudentCollection | null> {
        const classId = route.paramMap.get('classId') ?? '';
        return firstValueFrom(this.gradeStore.classes$.pipe(map(classes => classes.find(c => c.id === classId) ?? null)));
    }
}