import { CopyGradePeriodDto } from './request/grade-period/copy-grade-period';
import { MoveGradePeriodDto } from './request/grade-period/move-grade-period';
import { CreateGradePeriodDto } from './request/grade-period/create-grade-period';
import { DeleteGradePeriodDto } from './request/grade-period/delete-grade-period';
import { UpdateGradePeriodDto } from './request/grade-period/update-grade-period';
import { SingleGradesUpdateDto } from './request/grade-update/single-grades-update';
import { CreateMultiGradeConfigurationDto } from './request/multi/create-multi-grade-configuration';
import { DeleteMultiGradeConfigurationDto } from './request/multi/delete-multi-grade-configuration';
import { UpdateMultiGradeConfigurationDto } from './request/multi/update-multi-grade-configuration';
import { MoveMultiGradeConfigurationDto } from './request/multi/move-single-grade-configuration';
import { CreateSingleGradeConfigurationDto } from './request/single/create-single-grade-configuration';
import { DeleteSingleGradeConfigurationDto } from './request/single/delete-single-grade-configuration';
import { UpdateSingleGradeConfigurationDto } from './request/single/update-single-grade-configuration';
import { MoveSingleGradeConfigurationDto } from './request/single/move-single-grade-configuration';
import { CopyStudentCollectionDto } from './request/student-collection/copy-class-request';
import { CreateStudentCollectionDto } from './request/student-collection/create-class-request';
import { UpdateStudentCollectionDto } from './request/student-collection/update-class-request';
import { CreateStudentPeriodDto } from './request/students/create-student-period';
import { DeleteStudentPeriodDto } from './request/students/delete-student-period';
import { UpdateStudentPeriodDto } from './request/students/update-student-period';
import { TargetMoveSingleGradeConfigurationDto } from './request/single/target-move-single-grade-configuration';
import { TargetMoveMultiGradeConfigurationDto } from './request/multi/target-move-multi-grade-configuration';
import { StudentCollection } from './dtos/student-collection.model';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping'),

  getAllClasses: () => ipcRenderer.invoke('getAllClasses'),
  getClass: (id: string) => ipcRenderer.invoke('getClass', id),
  updateClass: (request: UpdateStudentCollectionDto) => ipcRenderer.send('updateClass', request),
  copyClass: (request: CopyStudentCollectionDto) => ipcRenderer.send('copyClass', request),
  createClass: (request: CreateStudentCollectionDto) => ipcRenderer.send('createClass', request),
  deleteClass: (request: string) => ipcRenderer.send('deleteClass', request),

  updateStudent: (request: UpdateStudentPeriodDto) => ipcRenderer.send('updateStudent', request),
  createStudent: (request: CreateStudentPeriodDto) => ipcRenderer.send('createStudent', request),
  deleteStudent: (request: DeleteStudentPeriodDto) => ipcRenderer.send('deleteStudent', request),

  moveSingleGradeConfiguration: (request: MoveSingleGradeConfigurationDto) => ipcRenderer.send('moveSingleGradeConfiguration', request),
  updateSingleGradeConfiguration: (request: UpdateSingleGradeConfigurationDto) => ipcRenderer.send('updateSingleGradeConfiguration', request),
  createSingleGradeConfiguration: (request: CreateSingleGradeConfigurationDto) => ipcRenderer.send('createSingleGradeConfiguration', request),
  deleteSingleGradeConfiguration: (request: DeleteSingleGradeConfigurationDto) => ipcRenderer.send('deleteSingleGradeConfiguration', request),
  targetMoveSingleGradeConfiguration: (request: TargetMoveSingleGradeConfigurationDto) => ipcRenderer.send('targetMoveSingleGradeConfiguration', request),

  updateSingleGrades: (request: SingleGradesUpdateDto) => ipcRenderer.send('updateSingleGrades', request),

  moveMultiGradeConfiguration: (request: MoveMultiGradeConfigurationDto) => ipcRenderer.send('moveMultiGradeConfiguration', request),
  updateMultiGradeConfiguration: (request: UpdateMultiGradeConfigurationDto) => ipcRenderer.send('updateMultiGradeConfiguration', request),
  createMultiGradeConfiguration: (request: CreateMultiGradeConfigurationDto) => ipcRenderer.send('createMultiGradeConfiguration', request),
  deleteMultiGradeConfiguration: (request: DeleteMultiGradeConfigurationDto) => ipcRenderer.send('deleteMultiGradeConfiguration', request),
  targetMoveMultiGradeConfiguration: (request: TargetMoveMultiGradeConfigurationDto) => ipcRenderer.send('targetMoveMultiGradeConfiguration', request),

  moveGradePeriod: (request: MoveGradePeriodDto) => ipcRenderer.send('moveGradePeriod', request),
  updateGradePeriod: (request: UpdateGradePeriodDto) => ipcRenderer.send('updateGradePeriod', request),
  copyGradePeriod: (request: CopyGradePeriodDto) => ipcRenderer.send('copyGradePeriod', request),
  createGradePeriod: (request: CreateGradePeriodDto) => ipcRenderer.send('createGradePeriod', request),
  deleteGradePeriod: (request: DeleteGradePeriodDto) => ipcRenderer.send('deleteGradePeriod', request),

  studentCollectionUpdated: (handler: (studentCollection: StudentCollection) => any) => ipcRenderer.on('studentcollectionupdated', (e, args) => handler(args)),
  studentCollectionDeleted: (handler: (id: string) => any) => ipcRenderer.on('studentcollectiondeleted', (e, args) => handler(args)),
});
