import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActiveDirectoryService {
  public activeDirectory$ = new BehaviorSubject<string[]>(this.getInitial());

  public changeDirectory(directoryTarget: string[]): void {
    localStorage.setItem('active-directory', directoryTarget.join(';'));
    this.activeDirectory$.next(directoryTarget);
  }

  private getInitial(): string[] {
    const i = localStorage.getItem('active-directory');
    if (i) {
      return i.split(';');
    } else {
      return [];
    }
  }
}
