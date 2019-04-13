import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Place } from '../../place';
import { PlacesService } from '../../places.service';
import { Station } from '../../station';
import * as d3 from 'd3';
import * as d3Time  from 'd3-time';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';

@Component({
  selector: 'app-linechartsmathirty',
  templateUrl: './linechartsmathirty.component.html',
  styleUrls: ['./linechartsmathirty.component.css']
})
export class LinechartsmathirtyComponent implements OnInit {
  stations: Station[]=[];
  title = 'Moving Average Chart';

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3Shape.Line<[number, number]>;

  constructor(private placesService: PlacesService, private http: HttpClient) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
   }

  ngOnInit() {
    this.fetchStations();
  }
  private initSvg() {
    this.svg = d3.select('svg')
        .append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
}

private initAxis() {
  var sma720 = this.simple_moving_averager(720)
  var data=this.stations;
  var i: any;
  //var arr = []
  for ( i in data){
    var n = data[i].availableDocks;
     data[i].sma=sma720(n);
    // this.arr.push(sma30(n));

    console.log(n)
  }
  //console.log(this.arr)
  this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
  this.y = d3Scale.scaleLinear().range([this.height, 0]);
  this.x.domain(this.stations.map((d: any) => d.lastCommunicationTime));
  this.y.domain(d3Array.extent(this.stations, (d) =>  d.sma ));
  console.log( (d3Array.extent(this.stations, (d) =>  d.availableDocks )))
}
private drawAxis() {

  this.svg.append('g')
      .attr('class', 'axis axis--x')
          
      .attr('transform', 'translate(0,' + this.height + ')')
     // .ticks(12,"%M")
      .call(d3Axis.axisBottom(this.x));

  this.svg.append('g')
      .attr('class', 'axis axis--y')
   
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('availableDocks');
}
private drawLine() {
  this.line = d3Shape.line()
      .x( (d: any) => this.x(d.lastCommunicationTime) )
      .y( (d: any) => this.y(d.sma));

  this.svg.append('path')
      .datum(this.stations)
      .attr('class', 'line')
      //.attr("stroke", "red")
      .attr('d', this.line);
      console.log(this.stations)
}
fetchStations() {
  this.placesService
    .getAvailabledocksforhourlysma()
    .subscribe((data: Station[]) => {
      this.stations = data;
    
      // console.log(this.stations);
      this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawLine();

    });

}
 simple_moving_averager(period) {
  var nums = [];
  
  return function (num) {
      nums.push(num);
      if (nums.length > period)
          nums.splice(0,1);  // remove the first element of the array
      var sum = 0;
      for (var i in nums)
          sum += nums[i];
      var n = period;
      if (nums.length < period)
          n = nums.length;
      return(sum/n);
  }
}

}
