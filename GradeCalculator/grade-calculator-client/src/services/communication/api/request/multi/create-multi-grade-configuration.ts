import { MultiGradeConfigurationData } from "./multi-grade-configuration.data";

export interface CreateMultiGradeConfigurationDto extends MultiGradeConfigurationData {
    studentCollectionId: string;
    gradePeriodId: string;
    multiParentId: string | null;
}