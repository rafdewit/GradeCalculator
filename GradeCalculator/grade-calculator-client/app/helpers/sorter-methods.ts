import { MultiGradeConfiguration } from '../dtos/grade-config/multi-grade-configuration.model';
import { StudentCollection } from '../dtos/student-collection.model';
import { SingleGradeConfiguration } from '../dtos/grade-config/single-grade-configuration.model';

export function moveItem<T>(arr: T[], index: number, left: boolean) {
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
  return arr;
}

// export function setGradeOrderIds(c: StudentCollection): void {
//   if (c.gradePeriods) {
//     let id = 1;
//     c.gradePeriods.forEach(p => {
//       p.orderId = id;
//       id++;
//     });
//   }
// }

export function setStudentCollectionOrderIds(c: StudentCollection): void {
  if (c.gradePeriods) {
    let id = 1;
    c.gradePeriods.forEach(p => {
      setMultiOrderIds(p.multiGradeConfigurations);
      p.orderId = id;
      id++;
    });
  }
}

export function setMultiOrderIds(multis: MultiGradeConfiguration[]): void {
  let id = 1;
  const ordered = multis.sort((a, b) => (a.orderId < b.orderId ? -1 : 1));
  ordered.forEach(o => {
    setSingleOrderIds(o.singleGradeConfigurations);
    setMultiOrderIds(o.multiGradeConfigurations);
    o.orderId = id;
    id++;
  });
}

export function setSingleOrderIds(singles: SingleGradeConfiguration[]): void {
  let id = 1;
  const ordered = singles.sort((a, b) => (a.orderId < b.orderId ? -1 : 1));
  ordered.forEach(o => {
    o.orderId = id;
    id++;
  });
}
