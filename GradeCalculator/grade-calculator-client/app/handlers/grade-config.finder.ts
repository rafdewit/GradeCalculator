import { GradePeriod } from "../dtos/grade-config/grade-period.model";
import { MultiGradeConfiguration } from "../dtos/grade-config/multi-grade-configuration.model";
import { SingleGradeConfiguration } from "../dtos/grade-config/single-grade-configuration.model";
import { StudentCollection } from "../dtos/student-collection.model";

export class GradeConfigFinder {
    public static findSingle(studentCollection: StudentCollection, id: string): GradeConfigSearchResult<SingleGradeConfiguration> | null {
        for (let i = 0; i < studentCollection.gradePeriods.length; i++) {
            const gradePeriod = studentCollection.gradePeriods[i];
            const rootSingle = this.findSingleFromSingleCollection(gradePeriod.singleGradeConfigurations, id);
            if (rootSingle) {
                const result: GradeConfigSearchResult<SingleGradeConfiguration> = {
                    result: rootSingle,
                    parent: null,
                    gradePeriod: gradePeriod
                }
                return result;
            }

            const subSingle = this.findSingleFromMultiCollection(gradePeriod.multiGradeConfigurations, id, gradePeriod);
            if (subSingle) {
                return subSingle;
            }
        }

        return null;
    }

    public static findMulti(studentCollection: StudentCollection, id: string): GradeConfigSearchResult<MultiGradeConfiguration> | null {
        for (let i = 0; i < studentCollection.gradePeriods.length; i++) {
            const gradePeriod = studentCollection.gradePeriods[i];
            const rootMulti = gradePeriod.multiGradeConfigurations.find(m => m.id === id);
            if (rootMulti) {
                const result: GradeConfigSearchResult<MultiGradeConfiguration> = {
                    result: rootMulti,
                    parent: null,
                    gradePeriod: gradePeriod
                }
                return result;
            }

            for (let i = 0; i < gradePeriod.multiGradeConfigurations.length; i++) {
                const subMulti = gradePeriod.multiGradeConfigurations[i];
                const multi = this.findMultiFromCollection(subMulti.multiGradeConfigurations, id, gradePeriod, subMulti);
                if (multi) {
                    return multi;
                }
            }
            
        }

        return null;
    }

    private static findSingleFromSingleCollection(singles: SingleGradeConfiguration[], id: string): SingleGradeConfiguration | null {
        return singles.find(m => m.id === id) ?? null;
    }

    private static findSingleFromMultiCollection(multis: MultiGradeConfiguration[], id: string, gradePeriod: GradePeriod): GradeConfigSearchResult<SingleGradeConfiguration> | null {
        for (let i = 0; i < multis.length; i++) {
            const multi = multis[i];
            const subSingle = this.findSingleFromSingleCollection(multi.singleGradeConfigurations, id);
            if (subSingle) {
                const result: GradeConfigSearchResult<SingleGradeConfiguration> = {
                    result: subSingle,
                    parent: multi,
                    gradePeriod: gradePeriod
                }
                return result;
            }

            const single = this.findSingleFromMultiCollection(multi.multiGradeConfigurations, id, gradePeriod);
            if (single) {
                return single;
            }
        }

        return null;
    }

    private static findMultiFromCollection(multis: MultiGradeConfiguration[], id: string, gradePeriod: GradePeriod, parent: MultiGradeConfiguration): GradeConfigSearchResult<MultiGradeConfiguration> | null {
        const multi = multis.find(m => m.id === id);
        if (multi) {
            const result: GradeConfigSearchResult<MultiGradeConfiguration> = {
                result: multi,
                parent: parent,
                gradePeriod: gradePeriod
            }

            return result;
        }

        for (let i = 0; i < multis.length; i++) {
            const subMultiFound = this.findMultiFromCollection(multis[i].multiGradeConfigurations, id, gradePeriod, multis[i]);
            if (subMultiFound) {
                return subMultiFound;
            }
        }

        return null;
    }
}

export class GradeConfigSearchResult<T> {
    result: T;
    parent: MultiGradeConfiguration | null;
    gradePeriod: GradePeriod;
}