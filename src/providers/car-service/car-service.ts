//ionic
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Constants from '../providerConstants';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';

//custom
import { UpdateCarRequest } from './update-car-request';
import { UpdateCarResponse } from './update-car-response';
import { CarCategory } from './car-category';
import { City } from './city';

let apiUrl = Constants.API_ENDPOINT


@Injectable()
export class CarServiceProvider {

  constructor(public http: Http) {

  }

  //return a list of all cars in the system no matter the status
  getAllCars(token) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('accept','application/json');
      headers.append('content-Type', 'application/json');
      headers.append('authorization','Bearer ' + token);
      
      
      this.http.get(apiUrl + "api/cars", {headers: headers})

        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

  //update a cars details with the supplied information
  updateCar(request: UpdateCarRequest, token: string) : Observable<UpdateCarResponse> {
        console.log('carService: updateCar(${request})');
    
            let headers: Headers = new Headers();
            headers.append('accept','application/json');
            headers.append('content-Type', 'application/json');
            headers.append('authorization','Bearer ' + token);
    
            return this.http.post(
                apiUrl +'api/cars/update', 
                request, 
                {headers:headers})
            .map(response=> response.json());
  }


  //return a list of available car categories for a car
  getCategories(token : string) : Observable<CarCategory[]>{
    
    console.log('carService: getCategories()');

        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + token);
    
        return this.http.get(
            apiUrl +'api/cars/categories', 
            {headers:headers})
        .map(response=> response.json());
        
  }

  //returns a list of available cities a car can be assigned to
  getCities(token : string) : Observable<City[]>{
    
    console.log('carService: getCities()');

        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + token);
    
        return this.http.get(
            apiUrl +'api/cities', 
            {headers:headers})
        .map(response=> response.json());
        
  }

  //returns a list of available statuses that can be assigned to a car
  getStatuses(token : string) : Observable<string[]>{
    
    console.log('carService: getStatuses()');

        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + token);
    
        return this.http.get(
            apiUrl +'api/cars/statuses', 
            {headers:headers})
        .map(response=> response.json());
        
  }
      

}
