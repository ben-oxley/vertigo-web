import {TestBed, async} from '@angular/core/testing'

import {Data} from '../data'
import {DataBlock} from '../datablock'
import {RawData} from '../processes/rawdata'
import { ProcessingModule } from '../processing.module';
import { SmoothedData } from '../processes/smootheddata';

//Roughly 1mil iterations possible per second
describe('RawData',()=>{
    it('Should be able to process at greater than 200Hz', async(()=>{
        const startTime = Date.now();
        var sut:RawData = new RawData();
        var iterations:number = 0;
        while (Date.now()-startTime<1000){
            sut.Load(new Data([Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]));
            iterations++;
        }
        console.log("Raw data iterations in 1 second: "+iterations);
        expect(iterations).toBeGreaterThan(200);
    }))
})

//Roughly 200k iterations possible per second
describe('SmoothedData',()=>{
    it('Should be able to process at greater than 200Hz', async(()=>{
        const startTime = Date.now();
        var sut:SmoothedData = new SmoothedData(100);
        var iterations:number = 0;
        while (Date.now()-startTime<1000){
            sut.Load(new Data([Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random(),Math.random()]));
            iterations++;
        }
        console.log("Smoothed data iterations in 1 second: "+iterations);
        expect(iterations).toBeGreaterThan(200);
    }))
})