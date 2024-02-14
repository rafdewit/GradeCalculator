// const { contextBridge, ipcRenderer } = require("electron");
// contextBridge.exposeInMainWorld("ipcRenderer", {ipcRenderer}); //exposing ipcRenderer to the window in renderer process 

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electron', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    ping: () => ipcRenderer.invoke('ping'),

    getAllClasses: () => ipcRenderer.invoke('getAllClasses'),
    getClass: (id: string) => ipcRenderer.invoke('getClass', id),
    updateClass: (request: any) => ipcRenderer.invoke('updateClass', request),
    copyClass: (request: any) => ipcRenderer.invoke('copyClass', request),
    createClass: (request: any) => ipcRenderer.invoke('createClass', request),
    deleteClass: (request: string) => ipcRenderer.invoke('deleteClass', request),

    updateStudent: (request: any) => ipcRenderer.invoke('updateStudent', request),
    createStudent: (request: any) => ipcRenderer.invoke('createStudent', request),
    deleteStudent: (request: any) => ipcRenderer.invoke('deleteStudent', request),

    updateSingleGradeConfiguration: (request: any) => ipcRenderer.invoke('updateSingleGradeConfiguration', request),
    createSingleGradeConfiguration: (request: any) => ipcRenderer.invoke('createSingleGradeConfiguration', request),
    deleteSingleGradeConfiguration: (request: any) => ipcRenderer.invoke('deleteSingleGradeConfiguration', request),

    updateSingleGrades: (request: any) => ipcRenderer.invoke('updateSingleGrades', request),

    updateMultiGradeConfiguration: (request: any) => ipcRenderer.invoke('updateMultiGradeConfiguration', request),
    createMultiGradeConfiguration: (request: any) => ipcRenderer.invoke('createMultiGradeConfiguration', request),
    deleteMultiGradeConfiguration: (request: any) => ipcRenderer.invoke('deleteMultiGradeConfiguration', request),

    updateGradePeriod: (request: any) => ipcRenderer.invoke('updateGradePeriod', request),
    copyGradePeriod: (request: any) => ipcRenderer.invoke('copyGradePeriod', request),
    createGradePeriod: (request: any) => ipcRenderer.invoke('createGradePeriod', request),
    deleteGradePeriod: (request: any) => ipcRenderer.invoke('deleteGradePeriod', request),
});