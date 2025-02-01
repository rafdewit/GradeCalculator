import { IHaveSubConfigurations } from './have-sub-configurations';
import { MultiGradeConfiguration } from './multi-grade-configuration.model';
import { SingleGradeConfiguration } from './single-grade-configuration.model';

export interface GradePeriod extends IHaveSubConfigurations {
  id: string;
  name: string;
  weight: number;
  orderId: number;
  multiGradeConfigurations: MultiGradeConfiguration[];
  singleGradeConfigurations: SingleGradeConfiguration[];
}
