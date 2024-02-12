import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'marginLeft' })
export class MarginLeftPipe implements PipeTransform {
  public transform(n: number | null): string {
    if(n) {
        return `${n*16}px`;
    }

    return '0';
  }
}