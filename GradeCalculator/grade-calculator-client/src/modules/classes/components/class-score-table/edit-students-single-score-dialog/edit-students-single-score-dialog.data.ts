import { SingleGradeConfiguration } from "src/services/dtos/grade-config/single-grade-configuration.model";
import { ClassScoreInfo } from "src/services/stores/models/score";

export interface EditStudentsSingleScoreDialogData {
    single: SingleGradeConfiguration;
    classScoreInfo: ClassScoreInfo;
}