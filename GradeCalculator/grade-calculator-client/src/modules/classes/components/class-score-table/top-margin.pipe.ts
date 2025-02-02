import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'topMargin' })
export class TopMarginPipe implements PipeTransform {
  public transform(level: number | null): string {
    if (!level || level === 0) {
      return '';
    }

    return `margin-top: ${16 * level}px`;
  }
}
