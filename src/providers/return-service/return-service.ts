import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Constants from '../providerConstants';
import 'rxjs/add/operator/map';

// let apiUrl = 'http://careshareapi-env.hdwwh7zgb3.us-east-1.elasticbeanstalk.com/';
let apiUrl = Constants.API_ENDPOINT



@Injectable()
export class ReturnServiceProvider {

  constructor(public http: Http) {

  }

  checkCurrentBooking(token, bookingId, lat, long) {
    return new Promise((resolve, reject) => {

     let headers: Headers = new Headers();
     console.log(bookingId);

     var checkCurrentBookingRequest = {
      BookingId: bookingId,
      Latitude: lat,
      Longitude: long
    };
    headers.append('accept','application/json');
    headers.append('content-Type', 'application/json');
    headers.append('authorization','Bearer ' + token);

      this.http.post(apiUrl + 'api/bookings/check/', checkCurrentBookingRequest,
          { headers: headers })


        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

  closeCurrentBooking(token, bookingId, lat, long) {
    return new Promise((resolve, reject) => {

     let headers: Headers = new Headers();


     var closeCurrentBookingRequest = {
      BookingId: bookingId,
      Latitude: lat,
      Longitude: long
    };

    headers.append('accept','application/json');
    headers.append('content-Type', 'application/json');
    headers.append('authorization','Bearer ' + token);

      this.http.post(apiUrl + 'api/bookings/close/', closeCurrentBookingRequest,
          { headers: headers })

        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

}
