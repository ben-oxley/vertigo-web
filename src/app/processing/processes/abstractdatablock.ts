import { DataBlock } from '../datablock';
import { Data } from '../data';
import { DataListener } from '../listener';

export abstract class AbstractDataBlock implements DataBlock {

    protected data: Data[] = [];
    protected headers: string[] = [];
    private listeners: DataListener[] = [];
    

    Headers(): string[] {
        return this.headers;
    }

    public SetHeaders(headers:string[])  {
        this.headers = headers;
    }

    public SetParams(params:number[]){

    }

    Data(): Data[] {
        return this.data;
    }

    AddListener(listener: DataListener) {
        this.listeners.push(listener);
    }

    protected notifyListeners(added: Data[], removed: Data[]) {
        this.listeners.forEach(l => l(added, removed));
    }

    abstract Load(data: Data);

    abstract LoadAll(data: Data[]);

    public Trim(min: number, max: number): Data[] {
        let minIdx = this.data.findIndex((v) => v.Timestamp > min);
        let maxIdx = this.data.findIndex((v) => v.Timestamp > max);
        if (minIdx === -1) { minIdx = 0; }
        if (maxIdx === -1) { maxIdx = this.data.length; }
        return this.data.slice(minIdx, maxIdx);
    }


}