import { SingleGradeConfigurationData } from "./single-grade-configuration.data";

export interface UpdateSingleGradeConfigurationDto extends SingleGradeConfigurationData {
    studentCollectionId: string;
    singleId: string;
}