import { Injectable } from "@angular/core";
import { GradeStore } from "../stores/grade.store";
import { ActivatedRouteSnapshot } from "@angular/router";
import { firstValueFrom, map } from "rxjs";
import { GradePeriod } from "../dtos/grade-config/grade-period.model";

@Injectable({ providedIn: 'root' })
export class PeriodResolver {
    constructor(private gradeStore: GradeStore) { }

    resolve(route: ActivatedRouteSnapshot): Promise<GradePeriod | null> {
        const classId = route.paramMap.get('classId') ?? '';
        const periodId = route.paramMap.get('periodId') ?? '';
        return firstValueFrom(this.gradeStore.classes$.pipe(map(classes => classes.find(c => c.id === classId)?.gradePeriods.find(p => p.id === periodId) ?? null)));
    }
}