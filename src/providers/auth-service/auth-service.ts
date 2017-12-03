//======================================
//
//Name: auth-service.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//Contributor: Drew Gamble, Steven Innes, Shawn Burriss
//
//======================================

//ionic
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Constants from '../providerConstants';
import 'rxjs/add/operator/map';

let apiUrl = Constants.API_ENDPOINT


//this provider handles authentication of users and account management functions
@Injectable()
export class AuthServiceProvider {

  constructor(public http: Http) {
  }

  //login to the system with supplied credentials
  postDataLogin(credentialsEmail, credentialsPass) {

    return new Promise((resolve, reject) => {

      let headers = new Headers();

      //send http post request with data and resolve promise
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

  //send a registration request to the server.
  postDataSignUp(firstName, lastName, email, password, passwordConfirm, dob, 
    licence, phone) {
      return new Promise((resolve, reject) => {

        //let server know we are sending json
        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');

        //build the registration request object
        var registerRequest = {
          FirstName: firstName,
          LastName: lastName,
          Email: email,
          Password: password,
          ConfirmPassword: password,
          DateOfBirth: dob,
          LicenceNumber: licence
        };

        //send http post request with data and resolve promise
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
  
  //send a one time password to activate an acccount in the system
  postDataOTP(otp, email) {
    return new Promise((resolve, reject) => {

      //let server know we are sending json
      let headers: Headers = new Headers();
      headers.append('accept','application/json');
      headers.append('content-Type', 'application/json');

      //build the one time password request
      var OTPRequest = {
        OTP: otp,
      Email: email
      };

      //send http post request with data and resolve promise
      this.http.post(
        apiUrl + 'api/account/otp',
        OTPRequest,
        { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
      });
    });

  }

  //update payment information in the system for an account
  postDataPaymentInfo(
    ccName, ccType, ccNum, ccMonth, ccYear, ccV, access_token) {
      return new Promise((resolve, reject) => {

        //pass in the current authenticated token via headers
        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + access_token);

        //build update request object from the supplied values
        var paymentInfoRequest = {
          CardName: ccName,
          CardType: ccType,
          CardNumber: ccNum,
          ExpiryMonth: ccMonth,
          ExpiryYear: ccYear,
          CardVerificationValue: ccV
        };

        //send http post request with data and resolve promise
        this.http.post(
          apiUrl + 'api/account/paymentmethod',
          paymentInfoRequest,
          { headers: headers })
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
        });
    });

  }

  //generate a password reset for an account with supplied secret info
  postPasswordResetInfo(email, dob, licence, password, passwordConfirm) {
    return new Promise((resolve, reject) => {

      //let server know we are sending json
      let headers: Headers = new Headers();
      headers.append('accept','application/json');
      headers.append('content-Type', 'application/json');3

      //build password reset request object
      var passwordResetRequest = {
        Email: email,
        Password: password,
        ConfirmPassword: passwordConfirm,
        DateOfBirth: dob,
        LicenceNumber: licence
      };

      //send http post request with data and resolve promise
      this.http.post(
        apiUrl + 'api/account/passwordreset',
        passwordResetRequest,
        { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });

  }

  //return information about the current logged in user
  checkAccountLogin(token) {
    return new Promise((resolve, reject) => {

      //pass in the current authenticated token via headers
      let headers = new Headers();
      headers.append('accept','application/json');
      headers.append('content-Type', 'application/json');
      headers.append('authorization','Bearer ' + token);

      //send http get request with data and resolve promise
      this.http.get(apiUrl + '/api/account/current', {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  //update the account information for a user
  postUpdateUserInfo(
    fname,lname,email,licNo,licST,add1,add2,suburb,
    state,postcode,ph,access_token) {
      return new Promise((resolve, reject) => {

        //pass in the current authenticated token via headers
        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + access_token);

        //build the user update request object
        var userupdateRequest = {
          FirstName:fname,
          LastName:lname,
          Email:email,
          LicenceNumber:licNo,
          LicenceState: licST,
          AddressLine1: add1,
          AddressLine2: add2,
          Suburb:suburb, 
          State: state,
          Postcode: postcode,
          PhoneNumber: ph
        };
    
        //send http post request with data and resolve promise
        this.http.post(
          apiUrl + 'api/account/registerupdate',
          userupdateRequest,
          { headers: headers })
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
        });
      });
  }

  //return the registration record for the logged in user
  registerDetailsCheck(token) {
    return new Promise((resolve, reject) => {

      //pass in the current authenticated token via headers
      let headers = new Headers();
      headers.append('accept','application/json');
      headers.append('content-Type', 'application/json');
      headers.append('authorization','Bearer ' + token);

      //send http get request with data and resolve promise
      this.http.get(
        apiUrl + '/api/account/registerupdatereturn', 
        {headers: headers})
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

}
    


