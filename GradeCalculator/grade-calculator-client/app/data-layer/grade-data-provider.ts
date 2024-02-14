import { readFile, writeFile } from "node:original-fs";
import { StudentCollection } from "../dtos/student-collection.model";
import Dexie from "dexie";

export const tableName: string = "studentcollection";
export class GradeDataProvider {
    private dbName = "gradedb";

    constructor() {
        const db = this.getDatabase();
        
    }

    getDatabase(): Dexie {
        var db = new Dexie(this.dbName);
        return db;
    }

    public store(studentCollection: StudentCollection): void {
        const db = this.getDatabase();
        db.table(tableName).put(studentCollection, studentCollection.id);
    }

    public async getAll(): Promise<StudentCollection[]> {
        readFile("", (data,d) => {})
        const db = this.getDatabase();
        const result = await db.table(tableName).toArray();
        return result as StudentCollection[];
    }
    
    public async get(id: string): Promise<StudentCollection> {
        const db = this.getDatabase();
        const result = await db.table(tableName).get(id);
        return result as StudentCollection;
    }
}