import { Pipe, PipeTransform } from '@angular/core';
import { colorsBetween } from '../generation/color.generation';

export const PERCENTAGE_GRADIENT_COLORS = colorsBetween('#FF01000', '#00FF00', 98);

@Pipe({ name: 'percentageToColor' })
export class PercentageToColorPipe implements PipeTransform {
  public transform(n: number | null): string {
    if (n === null) {
      return '';
    }

    if (n < 0) {
      return PERCENTAGE_GRADIENT_COLORS[0];
    } else if (n >= 100) {
      return PERCENTAGE_GRADIENT_COLORS[99];
    } else {
      const index = Math.trunc(n*100);
      return PERCENTAGE_GRADIENT_COLORS[index];
    }

    return '';
  }
}