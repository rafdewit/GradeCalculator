import { GradePeriod } from "../dtos/grade-config/grade-period.model";
import { MultiGradeConfiguration } from "../dtos/grade-config/multi-grade-configuration.model";
import { SingleGradeConfiguration } from "../dtos/grade-config/single-grade-configuration.model";
import { StudentCollection } from "../dtos/student-collection.model";
import { StudentSingleGrade } from "../dtos/students/student-single-grade.model";
import { Student } from "../dtos/students/student.model";
import { ClassScoreInfo, StudentInfo, StudentGradePeriodInfo, StudentSingleGradeInfo, StudentMultiGradeInfo } from "./models/score";

export function convertClass(c: StudentCollection): ClassScoreInfo {
    const result: ClassScoreInfo = {
        class: c,
        studentInfos: c.students.map(s => convertStudent(s, c)).sort((a, b) => alphabetically(false, a.totalPercentage, b.totalPercentage))
    };

    return result;
}

export function alphabetically(ascending: boolean, a: number | null, b: number | null): number {
    // equal items sort equally
    if (a === b) {
        return 0;
    }

    // nulls sort after anything else
    if (a === null) {
        return 1;
    }
    if (b === null) {
        return -1;
    }

    // otherwise, if we're ascending, lowest sorts first
    if (ascending) {
        return a < b ? -1 : 1;
    }

    // if descending, highest sorts first
    return a < b ? 1 : -1;
}

export function convertStudent(s: Student, c: StudentCollection): StudentInfo {
    const gradeMap = createGradeMap(s.studentSingleGrades);
    const gradePeriods = c.gradePeriods.map(p => convertGradePeriod(p, gradeMap));
    const result: StudentInfo = {
        student: s,
        gradePeriods: gradePeriods,
        totalPercentage: calculatePercentage(gradePeriods),
    };

    return result;
}

export function calculatePercentage(gradePeriods: StudentGradePeriodInfo[]): number | null {
    if (!gradePeriods.some(p => p.totalPercentage !== null)) {
        return null;
    }

    let total = 0;
    let totalItems = 0;
    gradePeriods.forEach(p => {
        if (p.totalPercentage !== null) {
            total += p.totalPercentage;
            totalItems++;
        }
    });

    return total / totalItems;
}

export function createGradeMap(grades: StudentSingleGrade[]): { [key: string]: StudentSingleGrade } {
    const gradeMap: { [key: string]: StudentSingleGrade } = {};
    grades?.forEach(g => gradeMap[g.singleGradeConfigurationId] = g);
    return gradeMap;
}

export function convertGradePeriod(p: GradePeriod, gradeMap: { [key: string]: StudentSingleGrade }): StudentGradePeriodInfo {

    const singleInfos = p.singleGradeConfigurations.map(g => mapSingleGradeInfos(g, gradeMap));
    const multiInfos = p.multiGradeConfigurations.map(g => mapMultiGradeInfos(g, gradeMap));
    const result: StudentGradePeriodInfo = {
        gradePeriod: p,
        studentSingleGradeInfos: singleInfos,
        studentMultiGradeInfos: multiInfos,
        totalPercentage: calculateMultiPercentage(singleInfos, multiInfos)
    };

    return result;
}

export function mapSingleGradeInfos(config: SingleGradeConfiguration, gradeMap: { [key: string]: StudentSingleGrade }): StudentSingleGradeInfo {
    const singleGrade = config.id in gradeMap ? gradeMap[config.id] : null;
    const result: StudentSingleGradeInfo = {
        single: config,
        score: singleGrade,
        percentage: singleGrade !== null && singleGrade.score !== null ? singleGrade.score / config.totalScore : null
    };

    return result;
}

export function mapMultiGradeInfos(config: MultiGradeConfiguration, gradeMap: { [key: string]: StudentSingleGrade }): StudentMultiGradeInfo {
    const singleInfos = config.singleGradeConfigurations.map(s => mapSingleGradeInfos(s, gradeMap));
    const multiInfos = config.multiGradeConfigurations.map(m => mapMultiGradeInfos(m, gradeMap));
    const result: StudentMultiGradeInfo = {
        multi: config,
        singleConfigurations: singleInfos,
        multiConfigurations: multiInfos,
        percentage: calculateMultiPercentage(singleInfos, multiInfos)
    };

    return result;
}

export function calculateMultiPercentage(singles: StudentSingleGradeInfo[], multis: StudentMultiGradeInfo[]): number | null {
    if (!singles.some(s => s.percentage !== null) && !multis.some(m => m.percentage !== null)) {
        return null;
    }

    let total = 0;
    let totalWeight = 0;

    singles.forEach(s => {
        if (s.percentage !== null) {
            total += s.percentage * s.single.weight;
            totalWeight += s.single.weight;
        }
    });

    multis.forEach(m => {
        if (m.percentage !== null) {
            total += m.percentage * m.multi.weight;
            totalWeight += m.multi.weight;
        }
    });

    return total / totalWeight;
}