export interface TargetMoveSingleGradeConfigurationDto {
  studentCollectionId: string;
  id: string;
  targetType: 'grade' | 'multi';
  targetId: string;
}
