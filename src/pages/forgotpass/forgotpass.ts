import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-forgotpass',
  templateUrl: 'forgotpass.html',
})

export class ForgotPasswordPage {

  // create a storage structure for the returned values
  newPasswordDetails = {"Email": "", "DateofBirth": "", "Licence": "", "Password":"", "ConfirmPassword":""};
  userData = {access_token: "", Name: "",Email: "",Id: "", 
  token_type:"",HasOpenBooking: false, OpenBookingId:-1};

  responseData : any;
  loader;
  resetFields: FormGroup;

  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public formBuilder: FormBuilder, 
    public alertCtrl: AlertController, public authService: AuthServiceProvider){
    this.resetFields = formBuilder.group({
      email: ["", Validators.compose([Validators.maxLength(255), Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$"), Validators.required])],
      dob: ["", Validators.compose([Validators.required])],
      licence: ["", Validators.compose([Validators.minLength(5), Validators.maxLength(20), Validators.required])],
      password: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(255), Validators.required])],
      passwordConfirm: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(255), Validators.required])]
    })
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
  
  resetPassword(){

    // loader caller here, could wrap this in the loader instead if wanted
    this.showLoading();
    
    // hard coded inputs for ease of build
    this.authService.postPasswordResetInfo(this.resetFields.value.email,
      this.resetFields.value.dob,
      this.resetFields.value.licence,
      this.resetFields.value.password,
      this.resetFields.value.passwordConfirm
  ).then((result) => {

      this.responseData = result;
      console.log(this.responseData);
      console.log(this.resetFields.value.dob);
      
      //save collected info for later use
      //localStorage.setItem('userData', JSON.stringify(this.responseData));
  
      this.dismissLoading();

      if(this.responseData.Success === false){

        let alert = this.alertCtrl.create({
          title: this.responseData.Message,
          subTitle: 'unable to reset password, please check your details',
          buttons: [{
            text: 'Try again',
            handler: () => {
            }}]
      });
      alert.present();
    }
      if(this.responseData.Success === true){
        
        let alert = this.alertCtrl.create({
          title: "Password succesfully reset",
          subTitle: 'Congratulations! Your password has been reset,' + 
          ' head to the login page to use your new password',
          buttons: [{
            text: 'login page',
            handler: () => {
              this.navCtrl.push(LoginPage, {}, {animate: false});
            }}]
      });
      alert.present();
    }

    }, (err) => {

      // Error handling
        let alert = this.alertCtrl.create({
          title: "Something went wrong :( ",
          subTitle: 'Unable to reset your password, please check your network connection and try again',
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