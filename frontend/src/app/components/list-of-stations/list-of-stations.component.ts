////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


/// This file and the source code provided can be used only for   
/// the projects and assignments of this course

/// Last Edit by Dr. Atef Bader: 1/30/2019


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////



    
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Station } from '../../station';
import { PlacesService } from '../../places.service';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';

import { Input, ViewChild, NgZone} from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import { Place } from 'src/app/place';




interface Location {
  lat: number;
  lng: number;
  zoom: number;
  address_level_1?:string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  label: string;
}

export interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

@Component({
  selector: 'app-list-of-stations',
  templateUrl: './list-of-stations.component.html',
  styleUrls: ['./list-of-stations.component.css']
})
export class ListOfStationsComponent implements OnInit {

 

  private margin: Margin;

  private width: number;
  private height: number;

  private svg: any;     // TODO replace all `any` by the right type

  private x: any;
  private y: any;
  private z: any;
  private g: any;

  stations: Station[];
  markers: Station[];
  placeSelected: Place;
  selectedCar: string;
  displayedColumns = ['id', 'stationName', 'availableBikes', 'availableDocks', 'is_renting', 'lastCommunicationTime', 'latitude',  'longitude', 'status', 'totalDocks','Divvy','Divvy1'];


  icon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    scaledSize: {
      width: 60,
      height: 60
    }
  }



  constructor(private placesService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.fetchStations();
    this.getPlaceSelected();
    this.initMargins();
  
  


  }
  private initMargins() {
    this.margin = {top: 20, right: 20, bottom: 30, left: 40};
}

  fetchStations() {
    this.placesService
      .getStations()
      .subscribe((data: Station[]) => {
        this.stations = data;
        this.markers = data;

      });
      
  }


  getPlaceSelected() {
    this.placesService
      .getPlaceSelected()
      .subscribe((data: Place) => {
        this.placeSelected = data;

      });
  }



  
  findAvailabledocks(placeName) {

    for (var i = 0,len = this.stations.length; i < len; i++) {

      if ( this.stations[i].id === placeName ) { // strict equality test

          var place_selected =  this.stations[i];

          break;
      }
    }

console.log(placeName)
    this.placesService.findAvailabledocks(placeName).subscribe(() => {
      this.router.navigate(['/line_chart']);
    });

  }

  findAvailabledocks1(placeName) {

    for (var i = 0,len = this.stations.length; i < len; i++) {

      if ( this.stations[i].id === placeName ) { // strict equality test

          var place_selected =  this.stations[i];

          break;
      }
    }


    this.placesService.findAvailabledocks1(placeName).subscribe(() => {
      this.router.navigate(['/line_chart1']);
    });

  }

  findAvailabledocks2(placeName) {

    for (var i = 0,len = this.stations.length; i < len; i++) {

      if ( this.stations[i].id === placeName ) { // strict equality test

          var place_selected =  this.stations[i];

          break;
      }
    }


    this.placesService.findAvailabledocks2(placeName).subscribe(() => {
      this.router.navigate(['/line_chart2']);
    });

  }
  findAvailabledockssma(placeName) {

    for (var i = 0,len = this.stations.length; i < len; i++) {

      if ( this.stations[i].id === placeName ) { // strict equality test

          var place_selected =  this.stations[i];

          break;
      }
    }


    this.placesService.findAvailabledockssma(placeName).subscribe(() => {
      this.router.navigate(['/line_chartsma']);
    });

  }

clickedMarker(label: string, index: number) {
  console.log(`clicked the marker: ${label || index}`)
}


circleRadius:number = 3000; // km

public location:Location = {
  lat: 41.882607,
  lng: -87.643548,
  label: 'You are Here',
  zoom: 13
};




}


