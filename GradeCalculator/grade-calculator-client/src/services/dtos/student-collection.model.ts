import { GradePeriod } from './grade-config/grade-period.model';
import { Student } from './students/student.model';

export interface StudentCollection {
  id: string;
  name: string;
  gradePeriods: GradePeriod[];
  students: Student[];
  directories: string[];
}
