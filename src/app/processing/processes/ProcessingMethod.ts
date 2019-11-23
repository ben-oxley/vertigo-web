import { DataBlock } from '../datablock';
import { SmoothedData } from './smootheddata';

interface Provider<T> {
    (args:number[]): T;
}

export class ProcessingMethod{
    
    public Name:string;
    public Params:string[];
    public DefaultParamValues:number[];
    private processingMethodCreator:Provider<DataBlock>;

    constructor(constructor:Provider<DataBlock>,name:string, params:string[], defaultValues:number[]){
        this.processingMethodCreator = constructor;
        this.Name =name;
        this.Params = params;
        this.DefaultParamValues = defaultValues;
    }

    public ConstructDataBlock():DataBlock{
        return this.processingMethodCreator(this.DefaultParamValues);
    }
}