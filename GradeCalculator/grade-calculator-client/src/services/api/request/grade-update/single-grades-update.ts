import { SingleGradeUpdateDto } from "./single-grade-update";

export interface SingleGradesUpdateDto {
    studentCollectionId: string;
    singleGradeConfigurationId: string;
    singleGradeUpdates: SingleGradeUpdateDto[];
}