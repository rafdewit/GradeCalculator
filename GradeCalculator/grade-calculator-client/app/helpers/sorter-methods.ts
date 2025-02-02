import { MultiGradeConfiguration } from '../dtos/grade-config/multi-grade-configuration.model';
import { StudentCollection } from '../dtos/student-collection.model';
import { SingleGradeConfiguration } from '../dtos/grade-config/single-grade-configuration.model';
import { IHaveOrder } from '../dtos/grade-config/have-order';

export function moveItemAndRegenerateOrderId<T extends IHaveOrder>(arr: T[], index: number, left: boolean) {
  let newIndex;
  if (left === false) {
    newIndex = (index + 1) % arr.length;
  } else if (left === true) {
    newIndex = (index - 1 + arr.length) % arr.length;
  } else {
    return arr;
  }

  // Swap elements
  [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];

  let counter = 1;
  arr.forEach(i => {
    i.orderId = counter;
    counter++;
  });

  return arr.sort((a, b) => (a.orderId < b.orderId ? -1 : 1));
}

export function setStudentCollectionOrderIds(c: StudentCollection): void {
  if (c.gradePeriods) {
    let newOrderId = 1;
    c.gradePeriods.forEach(p => {
      p.multiGradeConfigurations = setMultiOrderIds(p.multiGradeConfigurations);
      p.orderId = newOrderId;
      newOrderId++;
    });

    c.gradePeriods = c.gradePeriods.sort((a, b) => (a.orderId < b.orderId ? -1 : 1));
  }
}

export function setMultiOrderIds(multis: MultiGradeConfiguration[]): MultiGradeConfiguration[] {
  let newOrderId = 1;
  const ordered = multis.sort((a, b) => (a.orderId < b.orderId ? -1 : 1));
  ordered.forEach(o => {
    o.singleGradeConfigurations = setSingleOrderIds(o.singleGradeConfigurations);
    o.multiGradeConfigurations = setMultiOrderIds(o.multiGradeConfigurations);
    o.orderId = newOrderId;
    newOrderId++;
  });

  return ordered.sort((a, b) => (a.orderId < b.orderId ? -1 : 1));
}

export function setSingleOrderIds(singles: SingleGradeConfiguration[]): SingleGradeConfiguration[] {
  let id = 1;
  const ordered = singles.sort((a, b) => (a.orderId < b.orderId ? -1 : 1));
  ordered.forEach(o => {
    o.orderId = id;
    id++;
  });

  return ordered.sort((a, b) => (a.orderId < b.orderId ? -1 : 1));
}
