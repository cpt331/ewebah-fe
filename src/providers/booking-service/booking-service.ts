import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { CloseBookingCheckRequest } from './close-booking-check-request';
import { CloseBookingCheckResponse } from './close-booking-check-response';
import { CloseBookingRequest } from './close-booking-request';
import { CloseBookingResponse } from './close-booking-response';
import { OpenBookingResponse } from './open-booking-response';



@Injectable()
export class BookingServiceProvider {

    private apiUrl = 'http://carshareapi-dev.us-east-1.elasticbeanstalk.com';
    private openBookingEndpoint = 'api/bookings/open';
    private closeBookingCheckEndpoint = 'api/bookings/check';
    private closeBookingEndpoint = 'api/bookings/close/';

  constructor(public http: Http) {

  }

  public OpenBooking(vehicleId:number, token: string) : Observable<OpenBookingResponse> {
    
    console.log('BookingServiceProvider: OpenBooking(${vehicleId})');

    let headers: Headers = new Headers();
    headers.append('authorization','Bearer ' + token);

    return this.http.get(
        this.apiUrl+'/'+this.openBookingEndpoint+'/'+vehicleId, 
        {headers:headers})
        .map(response=> response.json());
            
  };

  
  public CloseBookingCheckRequest(request: CloseBookingCheckRequest, token: string) : Observable<CloseBookingCheckResponse> {
    
        console.log('BookingServiceProvider: CloseBookingCheckRequest(${request})');

        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + token);

        return this.http.post(
            this.apiUrl +'/'+this.closeBookingCheckEndpoint, 
            request, 
            {headers:headers})
        .map(response=> response.json());

  }

  public CloseBookingRequest(request: CloseBookingRequest, token: string) : Observable<CloseBookingResponse> {

        console.log('BookingServiceProvider: CloseBookingRequest(${request})');

        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + token);

        return this.http.post(
            this.apiUrl + '/' + this.closeBookingEndpoint, 
            request, 
            {headers:headers})
        .map(response=> response.json());
  }


}
