import { Observable } from 'rxjs';
import { UpdateMultiGradeConfigurationDto } from '../request/multi/update-multi-grade-configuration';
import { CreateMultiGradeConfigurationDto } from '../request/multi/create-multi-grade-configuration';
import { DeleteMultiGradeConfigurationDto } from '../request/multi/delete-multi-grade-configuration';
import { MoveMultiGradeConfigurationDto } from '../request/multi/move-multi-grade-configuration';

export abstract class IMultiGradeConfigurationClient {
  public abstract updateMultiGradeConfiguration(request: UpdateMultiGradeConfigurationDto): Observable<void>;
  public abstract createMultiGradeConfiguration(request: CreateMultiGradeConfigurationDto): Observable<void>;
  public abstract moveMultiGradeConfiguration(request: MoveMultiGradeConfigurationDto): Observable<void>;
  public abstract deleteMultiGradeConfiguration(request: DeleteMultiGradeConfigurationDto): Observable<void>;
}
