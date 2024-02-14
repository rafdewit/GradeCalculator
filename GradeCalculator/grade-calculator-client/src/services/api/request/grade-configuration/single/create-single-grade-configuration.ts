import { SingleGradeConfigurationData } from "./single-grade-configuration.data";

export interface CreateSingleGradeConfigurationDto extends SingleGradeConfigurationData {
    studentCollectionId: string;
    gradePeriodId: string;
    multiParentId: string | null;
}