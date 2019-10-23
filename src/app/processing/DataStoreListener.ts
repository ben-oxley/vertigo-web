import { DataType } from './datatype';
export interface DataStoreListener {
    /**
     * DataChanged
     */
    DataChanged(added: DataType[], removed: DataType[]);
}
