import { Pipe, PipeTransform } from '@angular/core';

export const scoreParts: ScoreClass[] = getParts();
export const simpleScoreParts: ScoreClass[] = getSimpleParts();
@Pipe({ name: 'gradeCategory' })
export class GradeCategoryPipe implements PipeTransform {
  public transform(n: number | null): string {
    if (n === null) {
      return '';
    }

    for (let i = 0; i < scoreParts.length; i++) {
      if (n < scoreParts[i].border) {
        return scoreParts[i].score;
      }
    }

    return '';
  }
}

export function getSimpleParts(): ScoreClass[] {
  const result: ScoreClass[] = [];
  result.push({ border: 0.51, score: '5' });

  const partitionConst = 0.49 / 4;

  for (let i = 0; i < 4; i++) {
    result.push({ border: 0.51 + partitionConst * i + partitionConst, score: `${4 - i}` });
  }

  result.push({ border: 101, score: '1' });

  return result;
}

export function getParts(): ScoreClass[] {
  const result: ScoreClass[] = [];
  result.push({ border: 0.51, score: '5' });

  const partitionConst = 0.49 / 3 / 4;

  for (let i = 0; i < 4; i++) {
    result.push({ border: 0.51 + partitionConst * i * 3 + partitionConst * 1, score: `${4 - i}-` });
    result.push({ border: 0.51 + partitionConst * i * 3 + partitionConst * 2, score: `${4 - i}` });
    result.push({ border: 0.51 + partitionConst * i * 3 + partitionConst * 3, score: `${4 - i}+` });
  }

  result.push({ border: 101, score: '1+' });

  return result;
}

export class ScoreClass {
  border: number;
  score: string;
}
