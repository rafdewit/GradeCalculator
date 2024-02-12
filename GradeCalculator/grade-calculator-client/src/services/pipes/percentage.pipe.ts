import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'percentage' })
export class PercentagePipe implements PipeTransform {
  public transform(n: number | null): string {
    if(n !== null) {
        return `${(n*100).toFixed(2)}%`;
    }

    return '';
  }
}