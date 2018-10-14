import {Data} from './data'

export interface DataListener{
    /**
     * DataChanged
     */
    DataChanged(added:Data[],remove:Data[]);
}