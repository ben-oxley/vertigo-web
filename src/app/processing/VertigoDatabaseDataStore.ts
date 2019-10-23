import { AbstractDataBlock } from './processes/abstractdatablock';
import { DataType } from './datatype';
import { DataBlock } from './datablock';
import { DataDataBase } from './DataDatabase';
import { VertigoDataStore } from './VertigoDataStore';
import { DataStoreListener } from "./DataStoreListener";
export class VertigoDatabaseDataStore implements VertigoDataStore {
    Get(type: DataType): DataBlock {
        throw new Error("Method not implemented.");
    }
    GetAvailableDataTypes(): DataType[] {
        throw new Error("Method not implemented.");
    }
    Load(type: DataType, data: AbstractDataBlock) {
        throw new Error("Method not implemented.");
    }
    Clear(dataType: DataType) {
        throw new Error("Method not implemented.");
    }
    ClearAll() {
        throw new Error("Method not implemented.");
    }
    private listeners: DataStoreListener[] = [];
    AddListener(listener: DataStoreListener) {
        this.listeners.push(listener);
    }
    private store(type: DataType, data: DataBlock) {
        console.log("Loading file");
        if (!('indexedDB' in window)) {
            console.log('This browser doesn\'t support IndexedDB');
            return;
        }
        let db: DataDataBase = new DataDataBase();
        try {
            db.build();
        }
        catch {
            console.log('Raw data types table already existed.');
        }
        let databaseInsertArray: any[] = data.Data().map(row => {
            return {
                timestamp: row.Timestamp,
                type: type,
                value: row.Data
            };
        });
        db.transaction('rw', db.data, async () => {
            db.data.bulkAdd(databaseInsertArray);
        }).catch(e => {
            alert(e.stack || e);
        });
    }
    protected notifyListeners(added: DataType[], removed: DataType[]) {
        this.listeners.forEach(l => l.DataChanged(added, removed));
    }
}
