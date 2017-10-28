import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Constants from '../providerConstants';
import 'rxjs/add/operator/map';

let apiUrl = Constants.API_ENDPOINT


@Injectable()
export class TransactionHistoryServiceProvider {

  constructor(public http: Http) {
  }


  getTransactionHistory(token, pageNumber, pageSize) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('accept','application/json');
      headers.append('content-Type', 'application/json');
      headers.append('authorization','Bearer ' + token);
      
      let completeURL = apiUrl + "api/account/bookings?pageNumber=" + pageNumber + 
              "&pageSize=" + pageSize ;
      
      this.http.get(completeURL, {headers: headers})

        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

}
