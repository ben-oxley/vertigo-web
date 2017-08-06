import { Directive, HostListener } from '@angular/core';
import 'csv-parse/lib/sync'
import * as p from 'csv-parse';

/**
* Allows the aside to be toggled via click.
*/
@Directive({
  selector: '[appAsideMenuToggler]',
})
export class FileParser {
  constructor() { }

  public parseFile(str:string):Array<Array<number>>{
      var fs = require('fs');
      var parse = require('csv-parse');
      var parse = require('csv-parse/lib/sync');
      var lines = parse(str,{relax_column_count: true});
      return lines;
  }

  public parseLines(callback:Function):Function{
        var fs = require('fs');
        var parse = require('csv-parse');
        var record; 
        // Create the parser
        var parser = parse({relax_column_count: true});
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
        
        });
        var f:Function = function(a){
            parser.write(a);
        }
        return f;
  }

  public parseArray(array:Array<Array<number>>,type:number,channel:number):any{
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

  public parseLine(outputArray:any,line:Array<number>,type:number,channel:number):any{
    if (line[1]==type){
        outputArray.push({x:(line[0])/1000.0,y:line[1+channel]});
    }
  }

  public parseLineAnd(outputArray:any,line:Array<number>,type:number,channel:number,then:Function):any{
    if (line[1]==type){
        var obj = {x:(line[0])/1000.0,y:line[1+channel]}
        outputArray.push(obj);
        then(obj);
    }
  }
    
}
