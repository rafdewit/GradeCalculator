import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'blobColorBorder' })
export class BlobColorBorderPipe implements PipeTransform {
  public transform(color: string | null): string {
    if(color) {
        return `7px solid ${color}`;
    }

    return '';
  }
}