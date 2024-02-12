export interface DefaultCrudDialogData<T> {
    object: T;
    deleteFlag: boolean;
    title: string;
    cancelFlag: boolean;
    isUpdate: boolean;
}