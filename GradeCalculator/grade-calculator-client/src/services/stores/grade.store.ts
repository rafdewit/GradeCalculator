import { Injectable } from "@angular/core";
import { GradeHubClient } from "../signalr/grade-hub.client";
import { StudentCollection } from "../dtos/student-collection.model";
import { GradeWebClient } from "../api/grade-web-client.service";
import { Observable, map, scan, startWith, switchMap } from "rxjs";
import { bufferOneRef } from "../rxjs/buffer-one-ref";
import { ClassScoreInfo, StudentGradePeriodInfo, StudentInfo, StudentMultiGradeInfo, StudentSingleGradeInfo } from "./models/score";
import { Student } from "../dtos/students/student.model";
import { GradePeriod } from "../dtos/grade-config/grade-period.model";
import { StudentSingleGrade } from "../dtos/students/student-single-grade.model";
import { SingleGradeConfiguration } from "../dtos/grade-config/single-grade-configuration.model";
import { MultiGradeConfiguration } from "../dtos/grade-config/multi-grade-configuration.model";

@Injectable({
    providedIn: 'root'
})
export class GradeStore {

    public classes$: Observable<StudentCollection[]>;
    public classScoreInfos$: Observable<ClassScoreInfo[]>;

    constructor(private gradeWebClient: GradeWebClient, private gradeHubClient: GradeHubClient) {
        this.classes$ = this.get();
        this.classScoreInfos$ = this.classes$.pipe(map(collection =>  collection.map(item => this.convertClass(item))));
    }

    private get(): Observable<StudentCollection[]> {
        const initialClasses$ = this.gradeWebClient.getAll();

        const attachCreate$ = initialClasses$.pipe(switchMap(r => {
            return this.gradeHubClient.studentCollectionUpdateEvent$.pipe(startWith(null), scan((acc, value) => {
                if (value) {
                    const index = acc.findIndex(i => i.id === value.id);
                    if (index >= 0) {
                        acc.splice(index, 1, value);
                    } else {
                        acc.push(value);
                    }
                }
                return acc;
            }, r))
        }));

        const attachDelete$ = attachCreate$.pipe(switchMap(r => {
            return this.gradeHubClient.studentCollectionDeletedEvent$.pipe(startWith(null), scan((acc, id) => {
                if (id) {
                    const index = acc.findIndex(i => i.id === id);
                    if (index >= 0) {
                        acc.splice(index, 1);
                    }
                }

                return acc;
            }, r))
        }));
        
        return attachDelete$.pipe(bufferOneRef());
    }

    private convertClass(c: StudentCollection): ClassScoreInfo {
        const result: ClassScoreInfo = {
            class: c,
            studentInfos: c.students.map(s => this.convertStudent(s, c))
        };

        return result;
    }

    private convertStudent(s: Student, c: StudentCollection): StudentInfo {
        const gradeMap= this.createGradeMap(s.studentSingleGrades);
        const gradePeriods = c.gradePeriods.map(p => this.convertGradePeriod(p, gradeMap));
        const result: StudentInfo = {
            student: s,
            gradePeriods: gradePeriods,
            totalPercentage: this.calculatePercentage(gradePeriods),
        };

        return result;
    }

    private calculatePercentage(gradePeriods: StudentGradePeriodInfo[]): number | null {
        if(!gradePeriods.some(p => p.totalPercentage)) {
            return null;
        }

        let total = 0;
        let totalItems = 0;
        gradePeriods.forEach(p => {
            if(p.totalPercentage) {
                total += p.totalPercentage;
                totalItems++;
            }
        });

        return total / totalItems;
    }

    private createGradeMap(grades: StudentSingleGrade[]): { [key: string]: StudentSingleGrade } {
        const gradeMap: { [key: string]: StudentSingleGrade } = {};
        grades.forEach(g => gradeMap[g.singleGradeConfigurationId] = g);
        return gradeMap;
    }

    private convertGradePeriod(p: GradePeriod, gradeMap: { [key: string]: StudentSingleGrade }): StudentGradePeriodInfo {
        
        const singleInfos = p.singleGradeConfigurations.map(g => this.mapSingleGradeInfos(g,gradeMap ));
        const multiInfos = p.multiGradeConfigurations.map(g => this.mapMultiGradeInfos(g, gradeMap));
        const result: StudentGradePeriodInfo = {
            gradePeriod: p,
            studentSingleGradeInfos: singleInfos,
            studentMultiGradeInfos: multiInfos,
            totalPercentage: this.calculateMultiPercentage(singleInfos, multiInfos)
        };

        return result;
    }

    private mapSingleGradeInfos(config: SingleGradeConfiguration, gradeMap: { [key: string]: StudentSingleGrade }): StudentSingleGradeInfo {
        const singleGrade = config.id in gradeMap ? gradeMap[config.id] : null;
        const result: StudentSingleGradeInfo = {
            single: config,
            score: singleGrade,
            percentage: singleGrade ? singleGrade.score / config.totalScore : null
        };

        return result;
    }
    
    private mapMultiGradeInfos(config: MultiGradeConfiguration, gradeMap: { [key: string]: StudentSingleGrade }): StudentMultiGradeInfo {
        const singleInfos = config.singleGradeConfigurations.map(s => this.mapSingleGradeInfos(s, gradeMap));
        const multiInfos = config.multiGradeConfigurations.map(m => this.mapMultiGradeInfos(m, gradeMap));
        const result: StudentMultiGradeInfo = {
            multi: config,
            singleConfigurations: singleInfos,
            multiConfigurations: multiInfos,
            percentage: this.calculateMultiPercentage(singleInfos, multiInfos)
        };

        return result;
    }

    private calculateMultiPercentage(singles: StudentSingleGradeInfo[], multis: StudentMultiGradeInfo[]): number | null {
        if(!singles.some(s => s.percentage) && !multis.some(m => m.percentage)) {
            return null;
        }

        let total = 0; 
        let totalWeight = 0;

        singles.forEach(s => {
            if(s.percentage) {
                total += s.percentage * s.single.weight;
                totalWeight += s.single.weight;
            }
        });

        multis.forEach(m => {
            if(m.percentage) {
                total += m.percentage * m.multi.weight;
                totalWeight += m.multi.weight;
            }
        });

        return total / totalWeight;
    }
}