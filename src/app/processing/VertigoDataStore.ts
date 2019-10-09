import { Data } from './data'
import { DataListener } from './listener';
import { AbstractDataBlock } from './processes/abstractdatablock';
import { DataType } from './datatype';
import { DataStoreListener } from './DataStoreListener';
import { DataBlock } from './datablock';

export interface VertigoDataStore {

    GetAvailableDataTypes(): DataType[];

    AddListener(Listener: DataStoreListener);

    Load(type: DataType, data: DataBlock);

    Get(type: DataType):DataBlock;

    Clear(dataType: DataType);

    ClearAll();

}


