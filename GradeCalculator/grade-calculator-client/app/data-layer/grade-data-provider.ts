import { StudentCollection } from '../dtos/student-collection.model';
import { GradePeriod } from '../dtos/grade-config/grade-period.model';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'original-fs';
import { deepCopy } from '../helpers/helper-methods';
import { MultiGradeConfiguration } from '../dtos/grade-config/multi-grade-configuration.model';
import { SingleGradeConfiguration } from '../dtos/grade-config/single-grade-configuration.model';

export const classesStorageDirectory: string = 'ClassesStorage';
export class GradeDataProvider {
  private _cache: Map<string, StudentCollection>;

  constructor() {
    this._cache = this.getAllInternal();
  }

  private getAllInternal(): Map<string, StudentCollection> {
    if (!existsSync(classesStorageDirectory)) {
      mkdirSync(classesStorageDirectory);
    }

    const jsonFiles = readdirSync(classesStorageDirectory).filter(file => file.endsWith('.json'));
    const studentCollections = jsonFiles.map(f => JSON.parse(readFileSync(`${classesStorageDirectory}/${f}`).toString()) as StudentCollection);
    const result = new Map<string, StudentCollection>();
    studentCollections.forEach(c => this.setOrderIds(c));
    studentCollections.forEach(c => result.set(c.id, c));
    return result;
  }

  private setOrderIds(c: StudentCollection): void {
    if (c.gradePeriods) {
      let id = 1;
      c.gradePeriods.forEach(p => {
        this.setMultiOrderIds(p.multiGradeConfigurations);
        p.orderId = id;
        id++;
      });
    }
  }

  private setMultiOrderIds(multis: MultiGradeConfiguration[]): void {
    let id = 1;
    const ordered = multis.sort((a, b) => (a.orderId < b.orderId ? -1 : 1));
    ordered.forEach(o => {
      this.setSingleOrderIds(o.singleGradeConfigurations);
      this.setMultiOrderIds(o.multiGradeConfigurations);
      o.orderId = id;
      id++;
    });
  }

  private setSingleOrderIds(singles: SingleGradeConfiguration[]): void {
    let id = 1;
    const ordered = singles.sort((a, b) => (a.orderId < b.orderId ? -1 : 1));
    ordered.forEach(o => {
      o.orderId = id;
      id++;
    });
  }

  public getAll(): StudentCollection[] {
    return Array.from(this._cache, ([, value]) => value);
  }

  public async get(id: string): Promise<StudentCollection | null> {
    if (this._cache.has(id)) {
      const studentCollection = this._cache.get(id);
      return studentCollection ?? null;
    }

    return null;
  }

  public async getDeepCopy(id: string): Promise<StudentCollection | null> {
    let item = await this.get(id);
    if (item) {
      item = deepCopy(item);
    }

    return item;
  }

  public async getGradePeriod(studentCollectionId: string, gradeId: string): Promise<GradePeriod | null> {
    if (this._cache.has(studentCollectionId)) {
      const studentCollection = this._cache.get(studentCollectionId);
      return studentCollection?.gradePeriods.find(p => p.id == gradeId) ?? null;
    }

    return null;
  }

  public async createOrUpdate(studentCollection: StudentCollection): Promise<void> {
    this._cache.set(studentCollection.id, studentCollection);
    writeFileSync(`${classesStorageDirectory}/Class-${studentCollection.id}.json`, JSON.stringify(studentCollection));
  }

  public delete(id: string): void {
    this._cache.delete(id);
    rmSync(`${classesStorageDirectory}/Class-${id}.json`);
  }
}
