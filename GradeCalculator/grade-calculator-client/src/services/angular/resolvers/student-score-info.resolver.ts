import { Injectable } from "@angular/core";
import { GradeStore } from "../../stores/grade.store";
import { ActivatedRouteSnapshot } from "@angular/router";
import { firstValueFrom, map } from "rxjs";
import { ClassScoreInfo, StudentInfo } from "../../stores/models/score";

@Injectable({ providedIn: 'root' })
export class StudentScoreInfoResolver {
  constructor(private gradeStore: GradeStore) {}

    resolve(route: ActivatedRouteSnapshot): Promise<ClassStudentInfo> {
      const classId = route.paramMap.get('classId') ?? '';
      const studentId = route.paramMap.get('studentId') ?? '';
      return firstValueFrom(this.gradeStore.classScoreInfos$.pipe(map(classes => {
        const classInfo = classes.find(c => c.class.id === classId) ?? null;
        const studentInfo = classInfo?.studentInfos.find(i => i.student.id === studentId) ?? null

        const result: ClassStudentInfo = {
          classInfo: classInfo,
          studentInfo: studentInfo
        };

        return result;
      })));
    }
}

export class ClassStudentInfo {
  classInfo: ClassScoreInfo | null;
  studentInfo: StudentInfo | null;
}