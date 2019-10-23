export class Data{
    public Timestamp:number;
    public Data:number[];

    public constructor(data:number[]){
        this.Data = data.slice();
    }

    public AddData(data:Data){
        if (data.Data.length!==this.Data.length)  throw new Error("Data arrays must be the same length");
        for (let index = 0; index < this.Data.length; index++) {
            this.Data[index]+=data.Data[index];
        }
    }

    public SubtractData(data:Data){
        if (data.Data.length!==this.Data.length)  throw new Error("Data arrays must be the same length");
        for (let index = 0; index < this.Data.length; index++) {
            this.Data[index]-=data.Data[index];
        }
    }

    public DivideData(data:Data){
        if (data.Data.length!==this.Data.length)  throw new Error("Data arrays must be the same length");
        for (let index = 0; index < this.Data.length; index++) {
            this.Data[index]/=data.Data[index];
        }
    }

    public MultiplyData(data:Data){
        if (data.Data.length!==this.Data.length)  throw new Error("Data arrays must be the same length");
        for (let index = 0; index < this.Data.length; index++) {
            this.Data[index]*=data.Data[index];
        }
    }

    public Add(data:number){
        for (let index = 0; index < this.Data.length; index++) {
            this.Data[index]+=data;
        }
    }

    public Subtract(data:number){
        for (let index = 0; index < this.Data.length; index++) {
            this.Data[index]-=data;
        }
    }

    public Divide(data:number){
        for (let index = 0; index < this.Data.length; index++) {
            this.Data[index]/=data;
        }
    }

    public Multiply(data:number){
        for (let index = 0; index < this.Data.length; index++) {
            this.Data[index]*=data;
        }
    }

    public static AddData(a:Data,b:Data):Data{
        var data:Data =  new Data(a.Data);
        data.AddData(b);
        return data;
    }

    public static SubtractData(a:Data,b:Data):Data{
        var data:Data =  new Data(a.Data);
        data.SubtractData(b);
        return data;
    }

    public static MultiplyData(a:Data,b:Data):Data{
        var data:Data =  new Data(a.Data);
        data.MultiplyData(b);
        return data;
    }

    public static DivideData(a:Data,b:Data):Data{
        var data:Data =  new Data(a.Data);
        data.DivideData(b);
        return data;
    }

    public static Add(a:Data,b:number):Data{
        var data:Data =  new Data(a.Data);
        data.Add(b);
        return data;
    }

    public static Subtract(a:Data,b:number):Data{
        var data:Data =  new Data(a.Data);
        data.Subtract(b);
        return data;
    }

    public static Multiply(a:Data,b:number):Data{
        var data:Data =  new Data(a.Data);
        data.Multiply(b);
        return data;
    }

    public static Divide(a:Data,b:number):Data{
        var data:Data =  new Data(a.Data);
        data.Divide(b);
        return data;
    }


  
}