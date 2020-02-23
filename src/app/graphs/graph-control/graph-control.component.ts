import { Component, Input, NgZone } from '@angular/core';
import { VertigoProcessedData } from '../../processing/vertigo-data';
import { VertigoRawData } from "../../processing/vertigo-data";
import { DataType } from '../../processing/datatype';
import { Data } from '../../processing/data';
import { Dataspec } from '../../processing/dataspec';
import { RawData } from 'src/app/processing/processes/rawdata';
import { DataListener } from 'src/app/processing/listener';
import { VertigoDataStoreManager } from 'src/app/processing/VertigoDataStoreManager';
import { VertigoDataStore } from 'src/app/processing/VertigoDataStore';
import { AbstractDataBlock } from 'src/app/processing/processes/abstractdatablock';
import { DataBlock } from 'src/app/processing/datablock';

@Component({
  selector: 'graph-control',
  templateUrl: './graph-control.component.html',
})
export class GraphControlComponent {

  public GraphData: any;
  public DataStore: VertigoDataStore;
  private selectedSeries: DataType[] = [];
  private renderedSeries: DataBlock[] = [];
  private renderRequested: boolean = false;
  private lastRender: number = 0;
  private controller: GraphControlComponent;
  private dataListener: DataListener = (a, r) => {
    let timeDiff: number = Math.round((Date.now() - this.lastRender) / 1000);
    if (!this.renderRequested && (!this.lastRender || timeDiff > 1)) {
      this.renderRequested = true;
      this.lastRender = Date.now();
      this.zone.run(() => {
        this.controller.seriesChanged(this.selectedSeries);
      });
    }

  };

  public constructor(private zone: NgZone) {
    this.controller = this;
    this.GraphData = [{
    }];
    this.DataStore = VertigoDataStoreManager.GetDataStore();
  }

  @Input() set SelectedSeries(selectedSeries: DataType[]) {
    this.selectedSeries = selectedSeries;
    this.seriesChanged(selectedSeries);
  }


  public rerender() {
    this.renderedSeries.forEach(r=>r.RemoveListener(this.dataListener));
    this.renderedSeries = [];
    this.GraphData = this.flatMap(this.selectedSeries, dt => {
      if (this.DataStore.Get(dt)) {
        const dataBlock: DataBlock = this.DataStore.Get(dt);
        const data: Data[] = dataBlock.Data();
        this.renderedSeries.push(dataBlock);
        dataBlock.AddListener(this.dataListener);
        if (data && data.length > 0) {
          return dt.Columns.map(c => {
            const t0 = data[0].Data[0];
            const d: Date = new Date(0); // The 0 there is the key, which sets the date to the epoch
            d.setUTCSeconds(t0 / 1000.0);
            const isDate = d < new Date(Date.now()) && d > new Date(0)
            return {
              x: data.map(datum => isDate ? new Date(datum.Data[0]).toISOString() : (datum.Data[0] - t0) / 1000.0),
              y: data.map(datum => datum.Data[c.Identifier]),
              name: c.Name + ' (' + c.Units + ')',
              yaxis: c.Id,
              typeid: dt.Identifier,
              colid: c.Id,
            } as any;
          });
        }
      }
    });
  }

  public seriesChanged(event: DataType[]) {
    if (this.DataStore.GetAvailableDataTypes().length > 0) {
      this.rerender();
    }
    return;
  }

  private flatMap<I, O>(array: Array<I>, func: (x: I) => O[]): Array<O> {
    let concatArray: Array<O> = [];
    array.map(func).forEach(set => concatArray = concatArray.concat(set));
    return concatArray;
  }


  public onLoaded(event: VertigoRawData) {
    this.rerender();

    if (this.flatMap(this.selectedSeries, dt => dt.Columns).length === 0) {
      const spec: Dataspec = new Dataspec();
      spec.Types[1].Columns = spec.Types[1].Columns.slice(0, 3);
      spec.Types = [spec.Types[1]];
      this.seriesChanged(spec.Types);
    } else {
      this.seriesChanged(this.selectedSeries);
    }
  }

  onRender() {
    this.renderRequested = false;

  }
}
