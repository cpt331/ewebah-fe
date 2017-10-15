import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


// let apiUrl = 'http://careshareapi-env.hdwwh7zgb3.us-east-1.elasticbeanstalk.com/';
let apiUrl = 'http://carshareapi-dev.us-east-1.elasticbeanstalk.com/';


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

  postDataSignUp(firstName, lastName, email, password, passwordConfirm, dob, licence, 
    phone, address1, address2, suburb, state, postcode) {
    return new Promise((resolve, reject) => {
     let headers: Headers = new Headers();

    headers.append('accept','application/json');
    headers.append('content-Type', 'application/json');

    var registerRequest = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      ConfirmPassword: password,
      DateOfBirth: dob,
      LicenceNumber: licence
    };

    console.log(dob);
      this.http.post(apiUrl + 'api/account/register',
          registerRequest,
          { headers: headers })
        //{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })

        //, {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

  // this is not being returned in a usable fashion
    locationAPIPost() {
      return new Promise((resolve, reject) => {
  console.log("ready to call");
  let headers = new Headers();
  headers.delete('allow-origin: *');
        this.http.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyCzqL1r32p55zTkgjJXd8gO5A85ubmDvqs", {headers: headers})
  
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            //reject(err);
            console.log(err);
          });
      });
    }

}
