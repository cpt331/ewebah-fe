//ionic
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Constants from '../providerConstants';
import 'rxjs/add/operator/map';

let apiUrl = Constants.API_ENDPOINT

//this provider is used to handle requests for booking transaction history
@Injectable()
export class TransactionHistoryServiceProvider {

  constructor(public http: Http) {
  }

  //return a list of booking transactions for the current user. this result
  //is a paged result and can expanded by requesting more pages.
  getTransactionHistory(token, pageNumber, pageSize) {
    return new Promise((resolve, reject) => {

      //pass in the current authenticated token via headers
      let headers = new Headers();
      headers.append('accept','application/json');
      headers.append('content-Type', 'application/json');
      headers.append('authorization','Bearer ' + token);
      
      //build the request url based on parameters passed in
      let completeURL = apiUrl + "api/account/bookings?pageNumber=" 
      + pageNumber + "&pageSize=" + pageSize ;
      
      this.http.get(completeURL, {headers: headers})

        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

}
