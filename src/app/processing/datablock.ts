import {Data} from './data'
import { DataListener } from './listener';

export interface DataBlock{
    
    Headers():string[];
    
    Data():Data[];

    AddListener(Listener:DataListener);
    
    RemoveListener(Listener:DataListener);

    Load(data:Data);

    LoadAll(data:Data[]);

    SetHeaders(headers:string[]);

    SetParams(params:number[]);

}