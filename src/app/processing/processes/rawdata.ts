import { DataBlock } from '../datablock';
import { Data } from '../data';
import { DataListener } from '../listener';
import { AbstractDataBlock } from './abstractdatablock';


export class RawData extends AbstractDataBlock {

    public static Cast(object: any): RawData {
        const rd: RawData = new RawData();
        rd.SetHeaders = object.headers;
        rd.data = object.data.map(d=>new Data(d.Data));
        rd.data.forEach(d => d.Timestamp = d.Data[0]);
        return rd;
    }

    public Load(data: Data) {
        this.data.push(data);
        this.notifyListeners([data], []);
    }

    public LoadAll(data: Data[]) {
        data.forEach(d => {
            this.data.push(d);
        });
        this.notifyListeners(data, []);
    }
}