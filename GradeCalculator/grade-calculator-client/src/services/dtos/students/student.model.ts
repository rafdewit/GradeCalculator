import { StudentSingleGrade } from "./student-single-grade.model";

export interface Student {
    id: string;
    name: number;
    studentSingleGrades: StudentSingleGrade[];
}