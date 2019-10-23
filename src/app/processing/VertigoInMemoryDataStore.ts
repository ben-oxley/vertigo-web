import { DataType } from './datatype';
import { DataBlock } from './datablock';
import { VertigoDataStore } from './VertigoDataStore';
import { DataStoreListener } from "./DataStoreListener";
export class VertigoInMemoryDataStore implements VertigoDataStore {
    
    private store: Map<DataType, DataBlock> = new Map<DataType, DataBlock>();
    private listeners: DataStoreListener[] = [];
    GetAvailableDataTypes(): DataType[] {
        return Array.from(this.store.keys());
    }
    Get(type: DataType): DataBlock {
        return this.store.get(type);
    }
    AddListener(listener: DataStoreListener) {
        this.listeners.push(listener);
    }
    Load(type: DataType, data: DataBlock) {
        this.store.set(type, data);
        this.notifyListeners([type], []);
    }
    Clear(dataType: DataType) {
        this.store.delete(dataType);
        this.notifyListeners([], [dataType]);
    }
    ClearAll() {
        let keys: DataType[] = Array.from(this.store.keys());
        this.notifyListeners([], keys);
    }
    protected notifyListeners(added: DataType[], removed: DataType[]) {
        this.listeners.forEach(l => l.DataChanged(added, removed));
    }
}
