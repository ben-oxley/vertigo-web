import {Parser}from 'papaparse';

export class FileParser {
  constructor() { }


  public static parseLines(callback:Function):Function{
        let parser:Parser = new Parser();
        var record; 
        // Create the parser
        
        // Use the writable stream api
        parser.on('readable', function(){
            while(record = parser.read()){
                callback(record);
            }
        });
        // Catch any error
        parser.on('error', function(err){
            console.log(err.message);
        });
        // When we are done, test that the parsed output matched what expected
        parser.on('finish', function(){
            console.log('Finished');

        });
        var f:Function = function(a){
            parser.write(a);
        }
        
        return f;
  }

  public static parseArray(array:Array<Array<number>>,type:number,channel:number):any{
    var index = 0;  
    var output = [];
    var start = array[0][0];
    array.forEach(line => {
          if (line[1]==type){
              output.push({x:(line[0]-start)/1000.0,y:line[1+channel]});
              index = index + 1;
          }
      });
      return output;
  }

  public static parseLine(outputArray:any,line:Array<number>,type:number,channel:number):any{
    if (line[1]==type){
        outputArray.push({x:(line[0])/1000.0,y:line[1+channel]});
    }
  }

  public static parseLineAnd(outputArray:any,line:Array<number>,type:number,channel:number,then:Function):any{
    if (line[1]==type){
        var obj = {x:(line[0])/1000.0,y:line[1+channel]}
        outputArray.push(obj);
        then(obj);
    }
  }
    
}
