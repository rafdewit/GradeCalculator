import { SingleGradeConfiguration } from './single-grade-configuration.model';

export interface MultiGradeConfiguration {
  id: string;
  name: string;
  weight: number;
  orderId: number;
  singleGradeConfigurations: SingleGradeConfiguration[];
  multiGradeConfigurations: MultiGradeConfiguration[];
}
