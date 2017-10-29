import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { ForgotPasswordPage } from "../forgotpass/forgotpass";
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // create a storage structure for the returned values
  enteredDetails = {"Email": "", "Password":""};
  userData = {access_token: "", Name: "",Email: "",Id: "", 
  token_type:"",HasOpenBooking: false, OpenBookingId:-1};

  responseData : any;
  loader;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
    public alertCtrl: AlertController, public authService: AuthServiceProvider){
 
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
    
    // hard coded inputs for ease of build

    // 's3353147@student.rmit.edu.au', 'password1', 'user1@gmail.com', 'password1', 'c@e.com', 'Password1!', this.enteredDetails.Email, this.enteredDetails.Password 'hsimpson@gmail.com', 'password1'
    this.authService.postDataLogin( 's3353147@student.rmit.edu.au', 'password1').then((result) => {
      this.responseData = result;

      
      //save collected info for later use
      localStorage.setItem('userData', JSON.stringify(this.responseData));
      
  
      this.dismissLoading();
      this.navCtrl.push(TabsPage, {}, {animate: false});

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
    
  
}