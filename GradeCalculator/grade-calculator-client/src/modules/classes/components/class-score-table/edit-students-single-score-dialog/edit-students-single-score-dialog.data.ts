import { SingleGradeConfiguration } from "src/services/dtos/grade-config/single-grade-configuration.model";
import { StudentCollection } from "src/services/dtos/student-collection.model";

export interface EditStudentsSingleScoreDialogData {
    single: SingleGradeConfiguration;
    studentCollection: StudentCollection;
}