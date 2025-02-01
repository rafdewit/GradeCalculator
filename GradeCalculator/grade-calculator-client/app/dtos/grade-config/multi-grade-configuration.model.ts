import { IHaveSubConfigurations } from './have-sub-configurations';
import { SingleGradeConfiguration } from './single-grade-configuration.model';

export interface MultiGradeConfiguration extends IHaveSubConfigurations {
  id: string;
  name: string;
  weight: number;
  orderId: number;
  singleGradeConfigurations: SingleGradeConfiguration[];
  multiGradeConfigurations: MultiGradeConfiguration[];
}
