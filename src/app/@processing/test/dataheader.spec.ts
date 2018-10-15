import {TestBed, async} from '@angular/core/testing'
import { DataStructure } from '../dataheader';

describe('DataStructure',()=>{
    it('Should contain four datatypes', async(()=>{
        let types:DataStructure = new DataStructure();
        expect(types.getTypes().length).toBe(4);
    }))
    it('Should contain GPS information', async(()=>{
        let types:DataStructure = new DataStructure();
        expect(types.getTypes().find(t=>t.type==="gps").columns.length).toBe(8);
        expect(types.getTypes().find(t=>t.type==="gps").columns.find(c=>c.name==="longitude")).toBeDefined();
    }))
    it('Should contain IMU information', async(()=>{
        let types:DataStructure = new DataStructure();
        expect(types.getTypes().find(t=>t.type==="imu").columns.length).toBe(6);
    }))
    it('Should contain AHRS information', async(()=>{
        let types:DataStructure = new DataStructure();
        expect(types.getTypes().find(t=>t.type==="ahrs").columns.length).toBe(4);
    }))
    it('Should contain atmospheric information', async(()=>{
        let types:DataStructure = new DataStructure();
        expect(types.getTypes().find(t=>t.type==="atmospheric").columns.length).toBe(1);
    }))
})