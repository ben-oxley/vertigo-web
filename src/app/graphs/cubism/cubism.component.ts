import { Component, OnInit, Input } from '@angular/core';
import * as cubism from 'cubism';
import * as d3 from 'd3';

@Component({
  selector: 'cubism',
  templateUrl: './cubism.component.html',
  styleUrls: ['./cubism.component.scss']
})
export class CubismComponent implements OnInit {


  @Input() data: any = { series: "a" }

  private context: any;

  constructor() { }

  onResize(event) {
    //console.log(event.target.innerWidth);
    //this.context.size(event.target.innerWidth/2)
  }

  private createGraphs(): void {
    this.context = cubism.context()
      .serverDelay(0)
      .clientDelay(0)
      .step(1e2)
      .size(960);
    var context = this.context;
    var random = function random(name) {
      var value = 0,
        values = [],
        i = 0,
        last;
      return context.metric(function (start, stop, step, callback) {
        start = +start, stop = +stop;
        if (isNaN(last)) last = start;
        while (last < stop) {
          last += step;
          value = Math.max(-10, Math.min(10, value + .8 * Math.random() - .4 + .2 * Math.cos(i += .2)));
          values.push(value);
        }
        callback(null, values = values.slice((start - stop) / step));
      }, name);
    }

    var foo = random("foo"),
      bar = random("bar");

    d3.select("#cubism").call(function (div) {

      div.append("div")
        .attr("class", "axis")
        .call(context.axis().orient("top"));

      div.selectAll(".horizon")
        .data([foo, bar, foo.add(bar), foo.subtract(bar)])
        .enter().append("div")
        .attr("class", "horizon")
        .call(context.horizon().extent([-20, 20]));

      div.append("div")
        .attr("class", "rule")
        .call(context.rule());

    });
  }

  ngOnInit() {
    this.createGraphs();
  }

}
