import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


let apiUrl = 'http://careshareapi-env.hdwwh7zgb3.us-east-1.elasticbeanstalk.com/';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postDataLogin(credentialsEmail, credentialsPass) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();


      this.http.post(apiUrl + 'Token',
    "userName=" + encodeURIComponent(credentialsEmail) +
    "&password=" + encodeURIComponent(credentialsPass) +
    "&grant_type=password", {headers: headers})
    //{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    
    //, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

  postDataSignUp(firstName, lastName, email, password, dob, licence, 
    phone, address1, address2, suburb, state, postcode) {
    return new Promise((resolve, reject) => {
     let headers: Headers = new Headers({'accept': 'application/json', 
     'Content-Type': 'application/json','Access-Control-Allow-Origin':'*',
     //'Access-Control-Request-Method': 'POST',
     //'Access-Control-Request-Headers': 'Content-Type, Authorization'
    });

      this.http.post(apiUrl + 'api/account/register',
    "firstName=" + encodeURIComponent(firstName) +
    "&lastName=" + encodeURIComponent(lastName) +
    "&email=" + encodeURIComponent(email) +
    "&password=" + encodeURIComponent(password) +
    "&dob=" + encodeURIComponent(dob) +
    "&licence=" + encodeURIComponent(licence) +
    "&phone=" + encodeURIComponent(phone) +
    "&address1=" + encodeURIComponent(address1) +
    "&address2=" + encodeURIComponent(address2) +
    "&suburb=" + encodeURIComponent(suburb) +
    "&state=" + encodeURIComponent(state) +
    "&postcode=" + encodeURIComponent(postcode), 
    {headers: headers})
    //{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    
    //, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

}
