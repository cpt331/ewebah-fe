import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import moment from 'moment';

import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class otpPage {

  today:any; mDate:any;
  // create a storage structure for the returned values
  enteredDetails = {"email": "","otp": ""};
  
  // for saving the entered data. Could be useful to enter the users data into 
  // the login field instead of making the user type it again
  userData = {"access_token": "", "Email": "","OTP": "", "token_type":""};
  responseData : any;
  loader;
  otpForm: FormGroup;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authService: AuthServiceProvider) {
    this.otpForm = formBuilder.group({
      otp: ["", Validators.compose([Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9 ]*')])],
	  email: ["", Validators.compose([Validators.maxLength(100), Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$"), Validators.required])]
    })
  }

   
  //loader function to stop the loader being called when it already exists
  // and dismissed when it doesn not exist
  showLoading() {
    if(!this.loader){
        this.loader = this.loadingCtrl.create({
          content: "Activating account. Please wait...",
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

  haveAccount(){
    this.navCtrl.push(LoginPage, {}, {animate: false});
  }

  otp(){

    // loader caller here, could wrap this in the loader instead if wanted
    this.showLoading();

    
    // hard coded inputs for ease of build
    this.authService.postDataOTP(this.otpForm.value.otp, 
	this.otpForm.value.email).then((result) => {
      this.responseData = result;
      
      //save collected info for later use
      //localStorage.setItem('userData', JSON.stringify(this.responseData));
      
      this.dismissLoading();

      if(this.responseData.Success === false){

        let alert = this.alertCtrl.create({
          title: this.responseData.Message,
          subTitle: 'Activation failed',
          buttons: [{
            text: 'Try again',
            handler: () => {
            }}]
      });
      alert.present();
    }
      if(this.responseData.Success === true){
        
        let alert = this.alertCtrl.create({
          title: "Activation successful",
          subTitle: 'Congratulations! Your account has been activated',
          buttons: [{
            text: 'login page',
            handler: () => {
              this.navCtrl.push(LoginPage, {}, {animate: false});
            }}]
      });
      alert.present();
    }

    }
    , (err) => {

      this.dismissLoading();
      // Error handling
        let alert = this.alertCtrl.create({
          title: "Something went wrong :( ",
          subTitle: 'Unable to activate, please check your network connection and try again',
          buttons: [{
            text: 'Try again',
            handler: () => {
            }
          }]
        });
        alert.present();
    });
  }

}
