

import {TestBed, async} from '@angular/core/testing'

import { CSVReader } from '../csv_reader';

//Roughly 1mil iterations possible per second
describe('CSVReader',()=>{
    it('Should be able to read in data from a file', load)
})

async function load(){
    let dataString = "349560,2,0.134766,-0.302246,0.939941,0.060976,0,-0.853659\n349560,3,-0.982403,0.155493,0.053947,0.088291,,\n349570,2,0.134766,-0.299316,0.933594,0,0.548781,-0.426829\n349570,3,-0.982402,0.15548,0.053916,0.088342,,\n349580,2,0.130859,-0.289551,0.944336,0.060976,0.97561,0.060976"
    let data = [];
    var fileText:string = dataString;
    var callback:Function = (l)=>{
        data.push(l);
    }
    var stringLoader:Function = CSVReader.parseLines(callback);
    fileText.split('\n').forEach(line=>{
        stringLoader(line+'\n');
    });
    console.log('Finished loading file');
    expect(fileText.split('\n').length).toEqual(5);
    await sleep(2000);
    expect(data.length).toEqual(5);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}