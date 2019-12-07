import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  @Output() selected = new EventEmitter();
  select() {
    this.selected.emit();
  }
  @Input('tabTitle') title: string;
  @Input() active = false;
  constructor() { }

  ngOnInit() {
  }

}

