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
      var lines = parse(str,{delimiter: '\n'});
      var output:Array<Array<number>> = [];
      lines.forEach(line => {
        var vals = parse(line,{delimiter: ','});
        output.push(vals[0]);
      });
      return output;
  }

  public parseArray(array:Array<Array<number>>,type:number,channel:number):any{
    var index = 0;  
    var output = [];
    array.forEach(line => {
          if (line[1]==type){
              output.push({x:index,y:line[1+channel]});
              index = index + 1;
          }
      });
      return output;
  }
    
}
