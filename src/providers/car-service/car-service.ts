import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

// let apiUrl = 'http://careshareapi-env.hdwwh7zgb3.us-east-1.elasticbeanstalk.com/';
let apiUrl = 'https://ewebahapi.azurewebsites.net/';


@Injectable()
export class CarServiceProvider {

  constructor(public http: Http) {
  }


  getAllCars(token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('accept','application/json');
      headers.append('content-Type', 'application/json');
      headers.append('authorization','Bearer ' + token);
      
      
      this.http.get(apiUrl + "api/cars", {headers: headers})

        .subscribe(res => {
          resolve(res.json());
          console.log(res)
        }, (err) => {
          reject(err);
        });
    });

  }

}
