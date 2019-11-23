import { ProcessingMethod } from './ProcessingMethod'
import { SmoothedData } from './smootheddata'
import { DataBlock } from '../datablock';
import { DataIntegrator } from './dataintegrator';
import { Decimator } from './decimator';


export class ProcessingMethods{
    public static Smoothing:ProcessingMethod = new ProcessingMethod((args:number[])=>{
        let smoothingProcessor:DataBlock = new SmoothedData();
        smoothingProcessor.SetParams(args)
        return smoothingProcessor;
    },"Rolling Average", ["Window"], [50]);
    public static Integrating:ProcessingMethod = new ProcessingMethod((args:number[])=>{
        let integrationProcessor:DataBlock = new DataIntegrator();
        integrationProcessor.SetParams(args)
        return integrationProcessor;
    },"Integration", [], []);
    public static Decimating:ProcessingMethod = new ProcessingMethod((args:number[])=>{
        let decimationProcessor:DataBlock = new Decimator();
        decimationProcessor.SetParams(args)
        return decimationProcessor;
    },"Decimation", ["Frequency"], [10]);
    public static GetAllMethods():ProcessingMethod[]{
        return [ProcessingMethods.Smoothing,ProcessingMethods.Integrating,ProcessingMethods.Decimating];
    } 
    
}