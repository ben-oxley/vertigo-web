import { DataBlock } from "../datablock";
import { Data } from "../data";
import { DataListener } from "../listener";

export abstract class AbstractDataBlock implements DataBlock{
    
    protected data:Data[]
    private listeners:DataListener[]

    Data(): Data[] {
        return this.data;
    }    
    
    AddListener(listener: DataListener) {
        this.listeners.push(listener);
    }

    protected notifyListeners(added:Data[],removed:Data[]){
        this.listeners.forEach(l=>l.DataChanged(added,removed))
    }

    abstract Load(data: Data);

    abstract LoadAll(data: Data[]);


}