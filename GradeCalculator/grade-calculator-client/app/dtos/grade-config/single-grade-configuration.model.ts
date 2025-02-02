import { IHaveOrder } from './have-order';

export interface SingleGradeConfiguration extends IHaveOrder {
  id: string;
  name: string;
  totalScore: number;
  weight: number;
  orderId: number;
}
