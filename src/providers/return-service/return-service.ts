//======================================
//
//Name: return-service.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//Contributor: Steven Innes
//
//======================================

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Constants from '../providerConstants';
import 'rxjs/add/operator/map';

let apiUrl = Constants.API_ENDPOINT


//this provider is used to handle the return process of a booked car
@Injectable()
export class ReturnServiceProvider {

  constructor(public http: Http) {

  }

  //checks if the booked car is eligible for return based on the lat/long
  //provided. will return a response that indicates success or failure and
  //an appropriate message
  checkCurrentBooking(token, bookingId, lat, long) {
    return new Promise((resolve, reject) => {

      //build request object
      var checkCurrentBookingRequest = {
        BookingId: bookingId,
        Latitude: lat,
        Longitude: long
      };

      //pass in the current authenticated token via headers
      let headers: Headers = new Headers();
      headers.append('accept','application/json');
      headers.append('content-Type', 'application/json');
      headers.append('authorization','Bearer ' + token);

      //send http post request with data and resolve promise
      this.http.post(
        apiUrl + 'api/bookings/check/', 
        checkCurrentBookingRequest,
        { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

  //return a booked car if it is eligible for return based on the lat/long
  //provided. will return a response that indicates success or failure and
  //an appropriate message
  closeCurrentBooking(token, bookingId, lat, long) {
    return new Promise((resolve, reject) => {

      var closeCurrentBookingRequest = {
        BookingId: bookingId,
        Latitude: lat,
        Longitude: long
      };

      //pass in the current authenticated token via headers
      let headers: Headers = new Headers();
      headers.append('accept','application/json');
      headers.append('content-Type', 'application/json');
      headers.append('authorization','Bearer ' + token);

      //send http post request with data and resolve promise
      this.http.post(
        apiUrl + 'api/bookings/close/', 
        closeCurrentBookingRequest,
        { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

}
