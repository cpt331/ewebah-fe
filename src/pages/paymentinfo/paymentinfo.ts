//======================================
//
//Name: paymentinfo.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//Contibutor: Drew Gamble
//
//======================================

import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { HomePage } from '../home/home';

@Component({
  selector: 'page-paymentinfo',
  templateUrl: 'paymentinfo.html'
})
export class PaymentInfoPage {

  userData = {"access_token": "", "Name": "","Email": "",
  "Id": "", "token_type":"","HasOpenBooking":"","OpenBookingId":""};
  enteredDetails = {"ccName": "","ccNum": "","ccExpiry": "","ccV": ""};
  
  // for saving the entered data. Could be useful to enter the users data into 
  // the login field instead of making the user type it again
  responseData : any;
  loader;
  paymentInfo: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, 
    public authService: AuthServiceProvider) {
    this.paymentInfo = formBuilder.group({
      ccName: ["", Validators.compose([Validators.maxLength(120), 
        Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      ccNum: ["", Validators.compose([Validators.maxLength(16), 
        Validators.pattern('[0-9]*'), Validators.required])],
      ccMonth: ["", Validators.compose([Validators.maxLength(2), 
        Validators.required])],
      ccYear: ["", Validators.compose([Validators.minLength(4), 
        Validators.maxLength(4), Validators.required])],
      ccV: ["", Validators.compose([Validators.minLength(3), 
        Validators.maxLength(4), Validators.required])]
    })
    this.loadUserData();
  }

  // loading the current user data from when the user signed in
    loadUserData(){
      
     const data = JSON.parse(localStorage.getItem('userData'));
      this.userData.Name = data.Name;
     this.userData.Email = data.Email;
     this.userData.access_token = data.access_token;
     this.userData.token_type = data.token_type
      this.userData.Id = data.Id
     this.userData.HasOpenBooking = data.HasOpenBooking;
     this.userData.OpenBookingId = data.OpenBookingId;
      
     }

     // loading indicators
    showLoading() {
      if(!this.loader){
          this.loader = this.loadingCtrl.create({
            content: "Registering payment details. Please wait...",
          });
          this.loader.present();
      }
    }
  
    dismissLoading(){
      if(this.loader){
          this.loader.dismiss();
          this.loader = null;
      }
    }

    determineType(ccNum) {
      if(ccNum.charAt(0) == "3"){
        return "American Express";
      } else if(ccNum.charAt(0) == "4"){
        return "Visa";
      } else if(ccNum.charAt(0) == "5"){
        return "Mastercard";
      } else {
        return "Special";
      }
    }

    submit(){
      this.enteredDetails.ccName = this.paymentInfo.value.ccName;
  
      // loader caller here, could wrap this in the loader instead if wanted
      this.showLoading();

      this.paymentInfo.value.ccType = this.determineType(this.paymentInfo.value.ccNum);
      
      // hard coded inputs for ease of build
      this.authService.postDataPaymentInfo(this.paymentInfo.value.ccName, 
      this.paymentInfo.value.ccType,
      this.paymentInfo.value.ccNum, 
      this.paymentInfo.value.ccMonth, 
      this.paymentInfo.value.ccYear, 
      this.paymentInfo.value.ccV,
      this.userData.access_token).then((result) => {
        this.responseData = result;
        
        //save collected info for later use
        //localStorage.setItem('userData', JSON.stringify(this.responseData));
    
        this.dismissLoading();
  
        if(this.responseData.Success === false){
  
          let alert = this.alertCtrl.create({
            title: this.responseData.Message,
            subTitle: 'unable to register payment details, please check your details',
            buttons: [{
              text: 'Try again',
              handler: () => {
              }}]
        });
        alert.present();
      }
        if(this.responseData.Success === true){
          
          let alert = this.alertCtrl.create({
            title: "User created",
            subTitle: 'Congratulations! Your payment info has been registered!',
            buttons: [{
              text: 'home page',
              handler: () => {
                this.navCtrl.push(HomePage, {}, {animate: false});
              }}]
        });
        alert.present();
      }
  
      }, (err) => {
  
        // Error handling
          let alert = this.alertCtrl.create({
            title: "Something went wrong :( ",
            subTitle: 'Unable to register payment details, ' + 
            'please check your network connection and try again',
            buttons: [{
              text: 'Try again',
              handler: () => {
                this.dismissLoading();
              }
            }]
          });
          alert.present();
      });
    }

}

