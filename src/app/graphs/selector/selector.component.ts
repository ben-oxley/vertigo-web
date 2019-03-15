import { Component, OnInit, SimpleChanges, Input, Output } from '@angular/core';
import { Dataspec } from '../../@processing/dataspec';
import { SelectionModel } from '@angular/cdk/collections';



@Component({
  selector: 'selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  constructor() { }

  public Dataspec:Dataspec = new Dataspec();
  @Output() SelectedValue:any = {columns:[]}

  ngOnInit() {
  }
  
  ngOnChanges(changes: SimpleChanges){
    console.log(this.SelectedValue);
  }

  public selectionChanged(event:any){
    console.log(Object.values(event).map(v=>{
      let key:any = (<any>v).value.split(":")[1].trim().replace('\'','').replace('\'','').split(",");
      let group:any = this.Dataspec.Types.find(t=>t.id===key[0]);
      return group.columns.find(d=>d.name===key[1]);
    }));
  }

}
