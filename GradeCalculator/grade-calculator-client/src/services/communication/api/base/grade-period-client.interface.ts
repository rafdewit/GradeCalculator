import { Observable } from "rxjs";
import { CopyGradePeriodDto } from "../request/grade-period/copy-grade-period";
import { CreateGradePeriodDto } from "../request/grade-period/create-grade-period";
import { DeleteGradePeriodDto } from "../request/grade-period/delete-grade-period";
import { UpdateGradePeriodDto } from "../request/grade-period/update-grade-period";

export abstract class IGradePeriodClient {
    public abstract updateGradePeriod(request: UpdateGradePeriodDto): Observable<void>;
    public abstract copyGradePeriod(request: CopyGradePeriodDto): Observable<void>;
    public abstract createGradePeriod(request: CreateGradePeriodDto): Observable<void>;
    public abstract deleteGradePeriod(request: DeleteGradePeriodDto): Observable<void>;
}