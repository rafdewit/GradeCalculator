import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'percentageToHundred' })
export class PercentageToHundredPipe implements PipeTransform {
  public transform(n: number | null): string {
    if(n) {
        return `${(n*100).toFixed(0)}`;
    }

    return '0';
  }
}