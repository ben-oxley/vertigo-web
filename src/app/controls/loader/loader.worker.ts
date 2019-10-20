import { ParseResult, parse } from 'papaparse';
import { Data } from 'src/app/processing/data';
import { VertigoRawData } from "src/app/processing/vertigo-data";
import { RawData } from 'src/app/processing/processes/rawdata';
import * as vertigospec from '../../processing/vertigo-spec.json';

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
    const contents: any = file.target;
    const fileText: string = contents.result;
    console.log('Loaded file, starting parsing');
    const lines = fileText.split('\n');
    const numberOfLines: number = lines.length;
    let linesProcessed = 0;
    const progressIncrement = Math.round(numberOfLines * 0.01);
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
