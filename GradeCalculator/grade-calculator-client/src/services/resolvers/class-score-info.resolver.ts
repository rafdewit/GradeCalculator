import { Injectable } from "@angular/core";
import { GradeStore } from "../stores/grade.store";
import { ActivatedRouteSnapshot } from "@angular/router";
import { firstValueFrom, map } from "rxjs";
import { ClassScoreInfo } from "../stores/models/score";

@Injectable({ providedIn: 'root' })
export class ClassScoreInfoResolver {
  constructor(private gradeStore: GradeStore) {}

    resolve(route: ActivatedRouteSnapshot): Promise<ClassScoreInfo | null> {
        const classId = route.paramMap.get('classId') ?? '';
        return firstValueFrom(this.gradeStore.classScoreInfos$.pipe(map(classes => classes.find(c => c.class.id === classId) ?? null)));
    }
}