import Dexie from 'dexie';

interface Data{
    timestamp: number;
    type: number;
    column: number;
    value: number;
}

interface StoredData{
    id?: number;
    dataType: number;
    column: number;
    processing: number;
}

interface Processing{
    stage: number;
    name: string;
    description: string;
}


export class DataDataBase extends Dexie {
    public data: Dexie.Table<Data, number>;
    public storedData: Dexie.Table<StoredData, number>;
    public processes: Dexie.Table<Processing, number>;

    public constructor(){
        super('processing');
        this.version(1).stores({
            data: '++id,timestamp,type,axis,value',
            storedTypes: '++id,[dataType+column+processing]',
            processes: 'stage,name',
        });
        this.data = this.table('data');
        this.storedData = this.table('storedTypes');
        this.processes = this.table('processes');
    }

    public build(){
        
        this.transaction('rw',this.processes,async()=>{
            this.processes.add({stage: 0, name: 'raw', description: 'Raw Data'});
            this.processes.add({stage: 1, name: 'smoothed', description: 'Smoothed Data'});
            this.processes.add({stage: 2, name: 'integrated', description: 'Integrated Data'});
            this.processes.add({stage: 3, name: 'differentiated', description: 'Differentiated Data'});
        }).catch(e => {
            alert(e.stack || e);
        });
    }
}
