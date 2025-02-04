import { Injectable } from '@angular/core';
import { MultiGradeConfiguration } from '../dtos/grade-config/multi-grade-configuration.model';
import { map, Observable } from 'rxjs';
import { GradeStore } from 'src/services/stores/grade.store';
import { StudentCollection } from 'app/dtos/student-collection.model';

export interface MultiCollectionTarget {
  type: 'grade' | 'multi';
  id: string;
  name: string;
  displayText: string;
}

@Injectable({
  providedIn: 'root',
})
export class MultiCollectionTargetStore {
  constructor(private gradeStore: GradeStore) {}

  public getMultiCollectionTargetsStream(id: string): Observable<MultiCollectionTarget[]> {
    return this.gradeStore.getClass(id).pipe(map(c => this.getMultiCollectionTargets(c)));
  }

  public getMultiCollectionTargets(c: StudentCollection | null): MultiCollectionTarget[] {
    if (!c) {
      return [];
    } else {
      const targets = c.gradePeriods.flatMap(p => {
        const r: MultiCollectionTarget = {
          type: 'grade',
          id: p.id,
          name: p.name,
          displayText: p.name,
        };

        return [r].concat(this.getMultiTargets(p.multiGradeConfigurations, p.name));
      });

      return targets;
    }
  }

  private getMultiTargets(multis: MultiGradeConfiguration[], root: string): MultiCollectionTarget[] {
    if (!multis) {
      return [];
    }

    const results = multis.map(m => {
      const r: MultiCollectionTarget = {
        type: 'multi',
        id: m.id,
        name: m.name,
        displayText: `${root} > ${m.name}`,
      };

      return r;
    });

    return results.concat(multis.flatMap(m => this.getMultiTargets(m.multiGradeConfigurations, `${root} > ${m.name}`)));
  }
}
