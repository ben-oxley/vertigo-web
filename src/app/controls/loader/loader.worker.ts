import { ParseResult, parse } from 'papaparse';
import { Data } from 'src/app/processing/data';
import { VertigoRawData } from "src/app/processing/vertigo-data";
import { RawData } from 'src/app/processing/processes/rawdata';
import * as vertigospec from '../../processing/vertigo-spec.json';
import { Quat2EulData } from 'src/app/processing/processes/quat2euldata.js';

/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const fileBlob: Blob = data;
  if (!fileBlob) {
    console.error('No file selected');
    return;
  }
  const reader = new FileReader();
  const rawData: VertigoRawData = new VertigoRawData();
  const types: any[] = (vertigospec as any).dataTypes;
  types.forEach(t => {
    const specIdentifier: number = t.identifier;
    const rawDataSpec: RawData = new RawData((t.columns as any[]).map(c => c.id as string));
    rawData.DataTypes.set(specIdentifier, rawDataSpec);
  });
  reader.onload = file => {
    const quatDataConverter: Quat2EulData = new Quat2EulData();
    const contents: any = file.target;
    const fileText: string = contents.result;
    console.log('Loaded file, starting parsing');
    const lines = fileText.split('\n');
    const numberOfLines: number = lines.length;
    let linesProcessed = 0;
    const progressIncrement = Math.round(numberOfLines * 0.01);
    let lastQuat: number[] = null;
    lines.forEach(line => {
      linesProcessed = linesProcessed + 1;
      const result: ParseResult = parse(line);
      if (linesProcessed % progressIncrement === 0){
        postMessage({
          progress: linesProcessed / numberOfLines,
          data: null
        });
      }
      if (result.data[0]) {
        if (result.data[0][1] === "3"){
          lastQuat = result.data[0].slice(2, 6);
          const rpy: number[] = Quat2EulData.toEuler(lastQuat);
          result.data[0] = result.data[0].concat(rpy);
        }
        if (result.data[0][1] === "2" && lastQuat) {
          const worldacc: number[] = Quat2EulData.convertToWorldReference(result.data[0].slice(2, 5), lastQuat);
          const worldAngVel: number[] = Quat2EulData.convertToWorldReference(result.data[0].slice(5, 8), lastQuat);
          result.data[0] = result.data[0].concat(worldacc).concat(worldAngVel);
        }
        if (!Number.isInteger(result.data[0][0])) {
          result.data[0][0] = Date.parse(result.data[0][0]);
        }
        const loadedData: Data = new Data(result.data[0]);
        const identifier: number = +result.data[0][1];
        rawData.DataTypes.get(identifier).Load(loadedData);
      }

    });
    console.log('Finished loading file');
    postMessage({
      progress: 1.0,
      data: rawData
    });
  };
  reader.readAsText(fileBlob);
});
