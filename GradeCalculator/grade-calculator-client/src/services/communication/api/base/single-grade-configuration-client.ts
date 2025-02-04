import { Observable } from 'rxjs';
import { CreateSingleGradeConfigurationDto } from '../request/single/create-single-grade-configuration';
import { DeleteSingleGradeConfigurationDto } from '../request/single/delete-single-grade-configuration';
import { UpdateSingleGradeConfigurationDto } from '../request/single/update-single-grade-configuration';
import { MoveSingleGradeConfigurationDto } from '../request/single/move-single-grade-configuration';
import { TargetMoveSingleGradeConfigurationDto } from '../request/single/target-move-single-grade-configuration';

export abstract class ISingleGradeConfigurationClient {
  public abstract updateSingleGradeConfiguration(request: UpdateSingleGradeConfigurationDto): Observable<void>;
  public abstract createSingleGradeConfiguration(request: CreateSingleGradeConfigurationDto): Observable<void>;
  public abstract deleteSingleGradeConfiguration(request: DeleteSingleGradeConfigurationDto): Observable<void>;
  public abstract moveSingleGradeConfiguration(request: MoveSingleGradeConfigurationDto): Observable<void>;
  public abstract targetMoveSingleGradeConfiguration(request: TargetMoveSingleGradeConfigurationDto): Observable<void>;
}
