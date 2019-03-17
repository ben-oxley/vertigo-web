import 'csv-parse/lib/sync'
import * as p from 'csv-parse';

export class CSVReader {
  constructor() { }

  public static parseLines(callback:Function):Function{
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
            console.log('Finished');

        });
        var f:Function = function(a){
            parser.write(a);
        }
        
        return f;
  }
    
}