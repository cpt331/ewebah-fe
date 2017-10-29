import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Constants from '../providerConstants';
import 'rxjs/add/operator/map';

let apiUrl = Constants.API_ENDPOINT



@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
  }

  postDataLogin(credentialsEmail, credentialsPass) {


    return new Promise((resolve, reject) => {
      let headers = new Headers();

      console.log(apiUrl);
      this.http.post(apiUrl + 'Token',
    "userName=" + encodeURIComponent(credentialsEmail) +
    "&password=" + encodeURIComponent(credentialsPass) +
    "&grant_type=password", {headers: headers})


        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  postDataSignUp(firstName, lastName, email, password, passwordConfirm, dob, licence, 
    phone//, address1, address2, suburb, state, postcode
  ) {
    return new Promise((resolve, reject) => {
     let headers: Headers = new Headers();

    headers.append('accept','application/json');
    headers.append('content-Type', 'application/json');

    // NEED TO ADD THE REST OF THE FIELDS
    var registerRequest = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      ConfirmPassword: password,
      DateOfBirth: dob,
      LicenceNumber: licence
    };

      this.http.post(apiUrl + 'api/account/register',
          registerRequest,
          { headers: headers })

        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

  postDataPaymentInfo(ccName, ccType, ccNum, ccMonth, ccYear, ccV, access_token) {
    return new Promise((resolve, reject) => {
     let headers: Headers = new Headers();

    headers.append('accept','application/json');
    headers.append('content-Type', 'application/json');
    headers.append('authorization','Bearer ' + access_token);

    var paymentInfoRequest = {
      CardName: ccName,
      CardType: ccType,
      CardNumber: ccNum,
      ExpiryMonth: ccMonth,
      ExpiryYear: ccYear,
      CardVerificationValue: ccV
    };

    console.log(ccYear);
      this.http.post(apiUrl + 'api/account/paymentmethod',
          paymentInfoRequest,
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
          });
      });
    }

    ckeckAccountLogin(token) {
      return new Promise((resolve, reject) => {
        let headers = new Headers();
  
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + token);
  
        console.log("checking current user")
        this.http.get(apiUrl + '/api/account/current', {headers: headers})
  
        
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
      });
    }

    recieveUpdateData(){
      return new Promise((resolve, reject) =>{
        let headers =new Headers();


        headers.append('accept','application/json');
        headers.append('content-type','application/json');
        headers.append('authorization','Bearer');

        console.log ("Getting user registration Data")
        this.http.get(apiUrl +'api/account/registerupdatereturn',{headers: headers})
        
        

        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  postUpdateUserInfo(DOB,licNo,licST,add1,add2,suburb,state,postcode,ph,access_token) {
    return new Promise((resolve, reject) => {
     let headers: Headers = new Headers();

    headers.append('accept','application/json');
    headers.append('content-Type', 'application/json');
    headers.append('authorization','Bearer ' + access_token);

    var userupdateRequest = {
      DateOfBirth:DOB,
      LicenceNumber:licNo,
      LicenceState: licST,
      AddressLine1: add1,
      AddressLine2: add2,
      Suburb:suburb, 
      State: state,
      Postcode: postcode,
      PhoneNumber: ph
    }
    

    //console.log(ccYear);
      this.http.post(apiUrl + 'api/account/registerupdate',userupdateRequest,
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
    


