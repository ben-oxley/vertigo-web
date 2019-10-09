import { Data } from './data'
import { DataListener } from './listener';
import { AbstractDataBlock } from './processes/abstractdatablock';
import { DataType } from './datatype';
import { DataStoreListener } from './DataStoreListener';

export interface VertigoDataStore {

    GetAvailableDataTypes(): DataType[];

    AddListener(Listener: DataStoreListener);

    Load(type: DataType, data: AbstractDataBlock);

    Clear(dataType: DataType);

    ClearAll();

}


