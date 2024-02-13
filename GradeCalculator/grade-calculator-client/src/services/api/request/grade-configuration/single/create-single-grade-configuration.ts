export interface CreateSingleGradeConfigurationDto {
    studentCollectionId: string;
    gradePeriodId: string;
    multiParentId: string;
    name: string;
    totalScore: number;
    weight: number
}