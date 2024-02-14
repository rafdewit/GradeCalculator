import { StudentCollection } from "../dtos/student-collection.model";
import { GradePeriod } from "../dtos/grade-config/grade-period.model";
import { mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "original-fs";

export const classesStorageDirectory: string = "ClassesStorage";
export class GradeDataProvider {
    private _cache: Map<string, StudentCollection>;

    constructor() {
        this._cache = this.getAllInternal();
    }

    private getAllInternal(): Map<string, StudentCollection> {
        mkdirSync(classesStorageDirectory)
        const jsonFiles = readdirSync(classesStorageDirectory).filter(file => file.endsWith('.json'));
        const studentCollections = jsonFiles.map(f => JSON.parse(readFileSync(`${classesStorageDirectory}/${f}`).toString()) as StudentCollection);
        const result = new Map<string, StudentCollection>();
        studentCollections.forEach(c => result.set(c.id, c));
        return result;
    }

    public getAll(): StudentCollection[] {
        return Array.from(this._cache, ([, value]) => value);
    }

    public async get(id: string): Promise<StudentCollection | null> {
        if(this._cache.has(id)) {
            const studentCollection = this._cache.get(id);
            return studentCollection ?? null;
        }

        return null;
    }

    public async getGradePeriod(studentCollectionId: string, gradeId: string): Promise<GradePeriod | null> {
        if(this._cache.has(studentCollectionId)) {
            const studentCollection = this._cache.get(studentCollectionId);
            return studentCollection?.gradePeriods.find(p => p.id == gradeId) ?? null;
        }
        
        return null;
    }

    public async createOrUpdate(studentCollection: StudentCollection): Promise<void>
    {
        this._cache.set(studentCollection.id, studentCollection);
        writeFileSync(`${classesStorageDirectory}/Class-${studentCollection.id}`, JSON.stringify(studentCollection));
    }

    public async delete(id: string): Promise<void>
    {
        this._cache.delete(id);
        rmSync(`${classesStorageDirectory}/Class-${id}`);
    }
}