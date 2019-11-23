import { RawData } from "./processes/rawdata.js";
import { AbstractDataBlock } from "./processes/abstractdatablock.js";
import { DataType } from './datatype.js';
import { Dataspec } from './dataspec.js';
import { DataBlock } from './datablock.js';

export class VertigoRawData {

    public DataTypes: Map<number, RawData>;

    public constructor() {
        this.DataTypes = new Map<number, RawData>();
    }

    public init(spec: Dataspec) {
        spec.Types.forEach(t => {
            let rd = new RawData();
            rd.SetHeaders(t.Columns.map(c=>c.Name));
            this.DataTypes.set(t.Identifier, rd);
        });
    }
}

export class VertigoProcessedData{

    public DataTypes: Map<number, DataBlock>;

    public constructor(){
        this.DataTypes = new Map<number, RawData>();
    }
}