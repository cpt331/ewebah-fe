import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { CloseBookingCheckRequest } from './close-booking-check-request';
import { CloseBookingCheckResponse } from './close-booking-check-response';
import { CloseBookingRequest } from './close-booking-request';
import { CloseBookingResponse } from './close-booking-response';
import { OpenBookingResponse } from './open-booking-response';

let apiUrl = 'http://carshareapi-dev.us-east-1.elasticbeanstalk.com';
let openBookingEndpoint = 'api/bookings/open';
let closeBookingCheckEndpoint = 'api/bookings/check';
let closeBookingEndpoint = 'api/bookings/close/';

@Injectable()
export class BookingServiceProvider {

  constructor(public http: Http) {

  }

  OpenBooking(vehicleId:number, token: string) : Observable<OpenBookingResponse> {
    
    console.log('BookingServiceProvider: OpenBooking(${vehicleId})');

    let headers: Headers = new Headers();
    headers.append('authorization','Bearer ' + token);

    return this.http.get(
        '${apiUrl}/${openBookingEndpoint}/${vehicleId}', 
        {headers:headers})
        .map(response=> response.json());
            
  };

  
  CloseBookingCheckRequest(request: CloseBookingCheckRequest, token: string) {
    
        console.log('BookingServiceProvider: CloseBookingCheckRequest(${request})');

        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + token);

        return this.http.post(
            '${apiUrl}/${closeBookingCheckEndpoint}', 
            request, 
            {headers:headers})
        .map(response=> response.json());

  }

  CloseBookingRequest(request: CloseBookingRequest, token: string){

        console.log('BookingServiceProvider: CloseBookingRequest(${request})');

        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + token);

        return this.http.post(
            '${apiUrl}/${closeBookingEndpoint}', 
            request, 
            {headers:headers})
        .map(response=> response.json());
  }


}
