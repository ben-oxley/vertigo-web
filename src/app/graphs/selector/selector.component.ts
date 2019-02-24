import { Component, OnInit } from '@angular/core';
import { Dataspec } from '../../@processing/dataspec';
import {TabsModule} from "ngx-tabs";


@Component({
  selector: 'selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  constructor() { }

  public Dataspec:Dataspec = new Dataspec();

  ngOnInit() {
  }

}
