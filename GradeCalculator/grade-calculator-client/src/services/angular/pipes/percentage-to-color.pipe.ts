import { Pipe, PipeTransform } from '@angular/core';
import { colorsBetween } from '../../generation/color.generation';

export const PERCENTAGE_GRADIENT_COLORS = colorsBetween('#FF0100', '#00FF00', 98);

@Pipe({ name: 'percentageToColor' })
export class PercentageToColorPipe implements PipeTransform {
  public transform(n: number | null, info: { colors: string[] }): string {
    if (n === null) {
      return '';
    }

    const index = Math.trunc(n*100);

    if (index <= 0) {
      return info.colors[0];
    } else if (index >= 100) {
      return info.colors[99];
    } else {
      return info.colors[index];
    }

    return '';
  }
}