import { StudentSingleGrade } from "./student-single-grade.model";

export interface Student {
    id: string;
    name: string;
    studentSingleGrades: StudentSingleGrade[];
}