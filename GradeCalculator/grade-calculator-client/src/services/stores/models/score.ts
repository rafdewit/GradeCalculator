import { GradePeriod } from 'app/dtos/grade-config/grade-period.model';
import { MultiGradeConfiguration } from 'app/dtos/grade-config/multi-grade-configuration.model';
import { SingleGradeConfiguration } from 'app/dtos/grade-config/single-grade-configuration.model';
import { StudentCollection } from 'app/dtos/student-collection.model';
import { StudentSingleGrade } from 'app/dtos/students/student-single-grade.model';
import { Student } from 'app/dtos/students/student.model';

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
