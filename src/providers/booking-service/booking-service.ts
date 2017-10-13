import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


let apiUrl = 'http://carshareapi-dev.us-east-1.elasticbeanstalk.com/';


@Injectable()
export class BookingServiceProvider {

 

  constructor(public http: Http) {
    console.log('Hello BookingServiceProvider Provider');
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


  
}
