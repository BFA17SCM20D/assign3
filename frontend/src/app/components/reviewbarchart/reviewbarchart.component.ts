import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Place } from '../../place';
import { PlacesService } from '../../places.service';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
@Component({
  selector: 'app-reviewbarchart',
  templateUrl: './reviewbarchart.component.html',
  styleUrls: ['./reviewbarchart.component.css']
})
export class ReviewbarchartComponent implements OnInit {
  places: Place[]=[];
  title = 'Bar Chart';
 
  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};

  private x: any;
  private y: any;
  private svg: any;
  private g: any;


  constructor(private placesService: PlacesService, private http: HttpClient) { }

  ngOnInit() {
    this.Placesget();
    
  }

  Placesget() {
    this.placesService
      .getPlaces()
      .subscribe((data: Place[]) => {
        this.places = data;
        console.log(this.places);
        this.initSvg();
        this.initAxis(this.places);
        this.drawAxis();
        this.drawBars(this.places);
      });
    }
  private initSvg() {
    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
}

private initAxis(loc) {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(loc.map((d) => d.name));
    console.log(this.x.x);

    this.y.domain([0, d3Array.max(this.places, (d) => parseInt(d.rating.toString()))]);
}

private drawAxis() {
    this.g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.y).ticks(10, 's'))
        .append('text')
        .attr('class', 'axis-title')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Review Ratings');
}

private drawBars(loc) {
    this.g.selectAll('.bar')
        .data(loc)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (f) => this.x(f.name) )
        .attr('y', (g) => this.y(g.rating) )
        .attr('width', this.x.bandwidth())
        .attr('height', (d) => this.height - this.y(d.rating) );
}

}
