import { MultiGradeConfigurationData } from "./multi-grade-configuration.data";

export interface UpdateMultiGradeConfigurationDto extends MultiGradeConfigurationData {
    studentCollectionId: string;
    multiId: string;
}