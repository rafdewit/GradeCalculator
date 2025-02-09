import { StudentCollection } from '../dtos/student-collection.model';
import { GradePeriod } from '../dtos/grade-config/grade-period.model';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'original-fs';
import { deepCopy } from '../helpers/helper-methods';
import { setStudentCollectionOrderIds } from '../helpers/sorter-methods';

export class GradeDataProvider {
  private _cache: Map<string, StudentCollection>;

  private path = require('path');

  constructor() {
    const files = this.getFiles();
    this._cache = this.getAllJsonFiles(files);
  }

  public getClassesStorageDirectory(): string {
    const { app } = require('electron');
    return this.path.join(app.getPath('appData'), 'GradeCalculator');
  }

  private getAllJsonFiles(files: string[]): Map<string, StudentCollection> {
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    const studentCollections = jsonFiles.map(f => this.readFile(f));
    const result = new Map<string, StudentCollection>();
    studentCollections.forEach(c => setStudentCollectionOrderIds(c));
    studentCollections.forEach(c => result.set(c.id, c));
    return result;
  }

  public getAllDirectories(): string[] {
    const files = this.getFiles();
    const directories = files.filter(f => statSync(`${this.getClassesStorageDirectory()}\\${f}`).isDirectory());
    return directories;
  }

  private getFiles(): string[] {
    if (!existsSync(this.getClassesStorageDirectory())) {
      mkdirSync(this.getClassesStorageDirectory());
    }

    const files = readdirSync(this.getClassesStorageDirectory(), { recursive: true }).map(file => (typeof file === 'string' ? file : file.toString()));
    return files;
  }

  private readFile(f: string): StudentCollection {
    const filePath = `${this.getClassesStorageDirectory()}\\${f}`;
    console.log(filePath);
    const parsedJson = JSON.parse(readFileSync(filePath).toString());
    return parsedJson as StudentCollection;
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
    const collectionPaths = studentCollection.directories ?? [];
    const paths = [this.getClassesStorageDirectory(), ...collectionPaths, `Class-${studentCollection.id}.json`];
    const resultingPath = this.path.join(...paths);
    writeFileSync(resultingPath, JSON.stringify(studentCollection));
  }

  public delete(id: string): void {
    this._cache.delete(id);
    rmSync(`${this.getClassesStorageDirectory()}/Class-${id}.json`);
  }
}
