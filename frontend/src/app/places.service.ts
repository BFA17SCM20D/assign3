////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


/// This file and the source code provided can be used only for   
/// the projects and assignments of this course

/// Last Edit by Dr. Atef Bader: 1/30/2019


////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpHeaders } from '@angular/common/http';



import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


import { Place } from './place';





const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { 
 

  }



  getPlaces() : Observable<Place[]> {
    return this.http.get<Place[]>(`${this.uri}/places`);
  }
 

  getPlaceSelected() {
    return this.http.get(`${this.uri}/place_selected`);
  }


  getStations() {
    return this.http.get(`${this.uri}/stations`);
  }

  getAvailabledockshourly() {
    return this.http.get(`${this.uri}/stationshourly`);
  }

  getAvailabledocksforday() {
    return this.http.get(`${this.uri}/stationsday`);
  }
  getAvailabledocksforsevenday() {
    return this.http.get(`${this.uri}/stationssevendays`);
  }
  getAvailabledocksforhourlysma() {
    return this.http.get(`${this.uri}/stationshourlysma`);
  }



  findPlaces(find, where) {
    const find_places_at = {
      find: find,
      where: where
    };

    return this.http.post(`${this.uri}/places/find`, find_places_at, httpOptions);

  }

 


  findStations(placeName) {
    const find_stations_at = {
      placeName: placeName
    };

    var str = JSON.stringify(find_stations_at, null, 2);


    return this.http.post(`${this.uri}/stations/find`, find_stations_at, httpOptions);

  }
  findAvailabledocks(placeName) {
    const find_stations_at = {
      placeName: placeName
    };
  console.log(placeName)
    var str = JSON.stringify(find_stations_at, null, 2);


    return this.http.post(`${this.uri}/stations/linechart`, find_stations_at, httpOptions);

  }
  findAvailabledocks1(placeName) {
    const find_stations_at = {
      placeName: placeName
    };
  console.log(placeName)
    var str = JSON.stringify(find_stations_at, null, 2);


    return this.http.post(`${this.uri}/stations/linechart1`, find_stations_at, httpOptions);

  }
  findAvailabledocks2(placeName) {
    const find_stations_at = {
      placeName: placeName
    };
  console.log(placeName)
    var str = JSON.stringify(find_stations_at, null, 2);


    return this.http.post(`${this.uri}/stations/linechart2`, find_stations_at, httpOptions);

  }
  findAvailabledockssma(placeName) {
    const find_stations_at = {
      placeName: placeName
    };
  console.log(placeName)
    var str = JSON.stringify(find_stations_at, null, 2);


    return this.http.post(`${this.uri}/stations/linechartsma`, find_stations_at, httpOptions);

  }

 


  
}
