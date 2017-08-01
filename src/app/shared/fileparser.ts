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
    
}
