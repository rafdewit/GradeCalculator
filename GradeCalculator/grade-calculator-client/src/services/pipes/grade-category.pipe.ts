import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'gradeCategory' })
export class GradeCategoryPipe implements PipeTransform {
  public transform(n: number | null): string {
    if(n === null) {
        return '';
    }

    const partitionConst = 0.04454545454545;
    if(n < 0.51) {
        return '5';
    } 
    
    for(let i = 0; i < 5; i++) {
        if(n < 0.51 + partitionConst * i * 3 + partitionConst * 1) {
            return `${4-i}-`
        } else if(n < 0.5 + partitionConst * i * 3 + partitionConst * 2) {
            return `${4-i}`
        } else if(n < 0.5 + partitionConst * i * 3 + partitionConst * 3) {
            return `${4-i}+`
        }
    }

    return 'NaN';
  }
}