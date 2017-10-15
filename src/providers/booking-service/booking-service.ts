import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// let apiUrl = 'http://careshareapi-env.hdwwh7zgb3.us-east-1.elasticbeanstalk.com/';
let apiUrl = 'http://carshareapi-dev.us-east-1.elasticbeanstalk.com/';



@Injectable()
export class BookingServiceProvider {

 

  constructor(public http: Http) {
  }


  bookCar(token, carId) {
    return new Promise((resolve, reject) => {

     let headers: Headers = new Headers();

    headers.append('accept','application/json');
    headers.append('content-Type', 'application/json');
    headers.append('authorization','Bearer ' + token);

      this.http.get(apiUrl + 'api/bookings/open/' + carId,
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
