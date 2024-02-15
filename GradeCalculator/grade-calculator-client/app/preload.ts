import { StudentCollection } from "./dtos/student-collection.model";
import { CopyStudentCollectionDto } from "./request/student-collection/copy-class-request";
import { CreateStudentCollectionDto } from "./request/student-collection/create-class-request";
import { UpdateStudentCollectionDto } from "./request/student-collection/update-class-request";

const { contextBridge, ipcRenderer } = require('electron')

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

    updateStudent: (request: any) => ipcRenderer.send('updateStudent', request),
    createStudent: (request: any) => ipcRenderer.send('createStudent', request),
    deleteStudent: (request: any) => ipcRenderer.send('deleteStudent', request),

    updateSingleGradeConfiguration: (request: any) => ipcRenderer.send('updateSingleGradeConfiguration', request),
    createSingleGradeConfiguration: (request: any) => ipcRenderer.send('createSingleGradeConfiguration', request),
    deleteSingleGradeConfiguration: (request: any) => ipcRenderer.send('deleteSingleGradeConfiguration', request),

    updateSingleGrades: (request: any) => ipcRenderer.send('updateSingleGrades', request),

    updateMultiGradeConfiguration: (request: any) => ipcRenderer.send('updateMultiGradeConfiguration', request),
    createMultiGradeConfiguration: (request: any) => ipcRenderer.send('createMultiGradeConfiguration', request),
    deleteMultiGradeConfiguration: (request: any) => ipcRenderer.send('deleteMultiGradeConfiguration', request),

    updateGradePeriod: (request: any) => ipcRenderer.send('updateGradePeriod', request),
    copyGradePeriod: (request: any) => ipcRenderer.send('copyGradePeriod', request),
    createGradePeriod: (request: any) => ipcRenderer.send('createGradePeriod', request),
    deleteGradePeriod: (request: any) => ipcRenderer.send('deleteGradePeriod', request),

    studentCollectionUpdated: (handler: (studentCollection: StudentCollection) => any) => ipcRenderer.on('studentcollectionupdated', (e, args) => handler(args)),
    studentCollectionDeleted: (handler: (id: string) => any) => ipcRenderer.on('studentcollectiondeleted', (e, args) => handler(args)),
});