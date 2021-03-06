//======================================
//
//Name: login.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//Contributor: Drew Gamble, Steven Innes
//======================================

import { Component } from '@angular/core';
import { IonicPage, NavController, Tabs } from 'ionic-angular';
import { AuthServiceProvider } from 
'../../providers/auth-service/auth-service';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { AdminHomePage } from '../admin-home/admin-home';
import { ForgotPasswordPage } from "../forgotpass/forgotpass";
import { otpPage } from "../otp/otp";
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ReturnPage } from '../return/return';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
  
})


export class LoginPage {

  // create a storage structure for the returned values

  enteredDetails = {Email: "", Password:""};
  userData = {access_token: "", Name: "",Email: "",Id: "", 
  token_type:"",HasOpenBooking: false, OpenBookingId:-1};
  responseData : any;
  loader;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
    public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, 
    public authService: AuthServiceProvider){

}

  ionViewDidLoad() {
  }

  //loader function to stop the loader being called when it already exists
  // and dismissed when it doesn not exist
  showLoading() {
    if(!this.loader){
        this.loader = this.loadingCtrl.create({
          content: "Verifying details...",
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

  
  signup(){
    this.navCtrl.push(SignupPage);
  }
  login(){
    // needs input validation
    

    // loader caller here, could wrap this in the loader instead if wanted
    this.showLoading();
    
    this.authService.postDataLogin(this.enteredDetails.Email, 
      this.enteredDetails.Password).then((result) => {
      this.responseData = result;

      
      //save collected info for later use
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      
  
      this.dismissLoading();
      if(this.responseData.HasAdminRights){
        this.navCtrl.push(AdminHomePage, {}, {animate: false});
      }
      else{

        this.navCtrl.push(TabsPage, {}, {animate: false});
      }

    }, (err) => {

      // Error handling
        let alert = this.alertCtrl.create({
          title: 'No User Found',
          subTitle: 'The details you entered don\'t match any registered users.' +
          ' Please check you details and try again or signup!',
          cssClass: 'NoUser',
          buttons: [{
            text: 'Try again',
            handler: () => {
              this.dismissLoading();
            }
          },
          {
            text: 'Sign up',
            handler: () => {
              this.dismissLoading();
              this.navCtrl.push(SignupPage, {}, {animate: false});
            }
          }]
        });
        alert.present();
    });
  }

  forgotPassword()
  {
    this.navCtrl.push(ForgotPasswordPage, {}, {animate: false});
  }
  
  activateAccount()
  {
    this.navCtrl.push(otpPage, {}, {animate: false});
  }
    
  
}