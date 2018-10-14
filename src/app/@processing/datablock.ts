import {Data} from './data'
import { DataListener } from './listener';

export interface DataBlock{
    

    Data():Data[];
    
    AddListener(Listener:DataListener);

    Load(data:Data);

    LoadAll(data:Data[]);

}