//ionic
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Constants from '../providerConstants';
import 'rxjs/add/operator/map';

let apiUrl = Constants.API_ENDPOINT



//this provider handles the booking of a car
@Injectable()
export class BookingServiceProvider {

 

  constructor(public http: Http) {
  }

  //books a car based on the supplied car id. will return a response
  //that indicates success or failure and a user friendly message
  bookCar(token, carId) {
    return new Promise((resolve, reject) => {


      //pass in the current authenticated token via headers
      let headers: Headers = new Headers();
      headers.append('accept','application/json');
      headers.append('content-Type', 'application/json');
      headers.append('authorization','Bearer ' + token);

      //send http get request with data and resolve promise
      this.http.get(
        apiUrl + 'api/bookings/open/' + carId,
        { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
          return false;
        });
    });

  }



}
