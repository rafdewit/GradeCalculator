import { GradePeriod } from "src/services/dtos/grade-config/grade-period.model";
import { MultiGradeConfiguration } from "src/services/dtos/grade-config/multi-grade-configuration.model";
import { SingleGradeConfiguration } from "src/services/dtos/grade-config/single-grade-configuration.model";
import { StudentCollection } from "src/services/dtos/student-collection.model";
import { StudentSingleGrade } from "src/services/dtos/students/student-single-grade.model";
import { Student } from "src/services/dtos/students/student.model";

export interface ClassScoreInfo {
    class: StudentCollection;
    studentInfos: StudentInfo[];
}

export interface StudentInfo {
    student: Student;
    gradePeriods: StudentGradePeriodInfo[];
    totalPercentage: number | null;
}

export interface StudentGradePeriodInfo {
    gradePeriod: GradePeriod;
    studentMultiGradeInfos: StudentMultiGradeInfo[];
    studentSingleGradeInfos: StudentSingleGradeInfo[];
    totalPercentage: number | null;
}

export interface StudentMultiGradeInfo {
    multi: MultiGradeConfiguration;
    multiConfigurations: StudentMultiGradeInfo[];
    singleConfigurations: StudentSingleGradeInfo[];
    percentage: number | null;
}

export interface StudentSingleGradeInfo {
    single: SingleGradeConfiguration;
    score: StudentSingleGrade | null;
    percentage: number | null;
}