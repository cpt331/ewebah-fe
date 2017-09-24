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
  }

  postDataLogin(credentialsEmail, credentialsPass) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();


      this.http.post(apiUrl + 'Token',
    "userName=" + encodeURIComponent(credentialsEmail) +
    "&password=" + encodeURIComponent(credentialsPass) +
    "&grant_type=password", {headers: headers})

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
     let headers: Headers = new Headers();

    headers.append('accept','application/json');
    headers.append('content-Type','application/json');

    //confirm password needs to be included as a new field in the form
      this.http.post(apiUrl + 'api/account/register',
    "firstName=" + encodeURIComponent(firstName) +
    "&lastName=" + encodeURIComponent(lastName) +
    "&email=" + encodeURIComponent(email) +
    "&password=" + encodeURIComponent(password) +
    "&confirmPassword=" + encodeURIComponent(password) +
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
