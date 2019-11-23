export class Param {
    public Name:string;
    public DefaultValue:number;
    public Value:number;

    constructor(name:string, defaultValue:number){
        this.Name = name;
        this.DefaultValue = defaultValue;
        this.Value = defaultValue;
    }
}