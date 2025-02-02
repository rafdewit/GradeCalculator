import { IHaveSubConfigurations } from './have-sub-configurations';
import { SingleGradeConfiguration } from './single-grade-configuration.model';
import { IHaveOrder } from './have-order';

export interface MultiGradeConfiguration extends IHaveSubConfigurations, IHaveOrder {
  id: string;
  name: string;
  weight: number;
  orderId: number;
  singleGradeConfigurations: SingleGradeConfiguration[];
  multiGradeConfigurations: MultiGradeConfiguration[];
}
