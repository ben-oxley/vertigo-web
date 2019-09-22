import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-view',
  templateUrl: './progress-view.component.html',
  styleUrls: ['./progress-view.component.scss']
})
export class ProgressViewComponent implements OnInit {

  @Input() Progress: number = 1.0;

  constructor() { }

  ngOnInit() {
  }

}
