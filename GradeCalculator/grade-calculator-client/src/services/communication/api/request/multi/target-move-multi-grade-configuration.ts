export interface TargetMoveMultiGradeConfigurationDto {
  studentCollectionId: string;
  id: string;
  targetType: 'grade' | 'multi';
  targetId: string;
}
