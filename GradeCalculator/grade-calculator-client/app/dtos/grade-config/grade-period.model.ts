import { MultiGradeConfiguration } from "./multi-grade-configuration.model";
import { SingleGradeConfiguration } from "./single-grade-configuration.model";

export interface GradePeriod {
    id: string;
    name: string;
    multiGradeConfigurations: MultiGradeConfiguration[];
    singleGradeConfigurations: SingleGradeConfiguration[];
}