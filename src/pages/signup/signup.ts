import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams, Platform, ModalController} from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import moment from 'moment';

import { LoginPage } from '../login/login';
import { AutocompletePage } from '../home/autocompletepage';
import { otpPage } from '../otp/otp';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  today:any; mDate:any;
  // create a storage structure for the returned values
  enteredDetails = {"firstName": "","lastName": "","email": "","password": "","passwordConfirm": "","dob": "", 
  "licence":"","phone": ""//,"address1": "","address2": "","suburb": "","state": "","postcode": ""
};
  
  // for saving the entered data. Could be useful to enter the users data into 
  // the login field instead of making the user type it again
  userData = {"access_token": "", "Name": "","Email": "","Id": "", "token_type":""};
  responseData : any;
  loader;
  signupFields: FormGroup;

  address;
  geo: any

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authService: AuthServiceProvider, public ModalCtrl: ModalController) {

  
    this.signupFields = formBuilder.group({
      firstName: ["", Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ["", Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ["", Validators.compose([Validators.maxLength(255), Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$"), Validators.required])],
      password: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(255), Validators.required])],
      passwordConfirm: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(255), Validators.required])],
      dob: ["", Validators.compose([Validators.required])],
      licence: ["", Validators.compose([Validators.minLength(5), Validators.maxLength(20), Validators.required])],
      phone: ["", Validators.compose([Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[+0-9 ]*'), Validators.required])]//,
      //address1: [""],
      //address2: [""],
      //suburb: [""],
      //state: [""],
      //postcode: ["", Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9 ]*')])]
    })
    this.address = {
      place: ''   
    };  
  }

  ionViewDidLoad() {
  this.getMaxDate();  
    }

getMaxDate()
{
  let year = moment().format('YYYY');
  let month = moment().format('MM');
  let day = moment().format("DD");
  
}
  
  //loader function to stop the loader being called when it already exists
  // and dismissed when it doesn not exist
  showLoading() {
    if(!this.loader){
        this.loader = this.loadingCtrl.create({
          content: "Registering account. Please wait...",
        });
        this.loader.present();
    }
  }
  


  showAddressModal () {
    let modal = this.ModalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      if(!!data){
        this.address.place = data;
        this.geo = data;
      }
    });
    modal.present();
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

  signup(){
    this.enteredDetails.firstName = this.signupFields.value.firstName;

    // loader caller here, could wrap this in the loader instead if wanted
    this.showLoading();

    
    // hard coded inputs for ease of build
    this.authService.postDataSignUp(this.signupFields.value.firstName, 
    this.signupFields.value.lastName,
    this.signupFields.value.email, 
    this.signupFields.value.password,
    this.signupFields.value.passwordConfirm, 
    this.signupFields.value.dob, 
    this.signupFields.value.licence, 
    this.signupFields.value.phone
  ).then((result) => {
      this.responseData = result;
      
      //save collected info for later use
      //localStorage.setItem('userData', JSON.stringify(this.responseData));
      
      this.dismissLoading();

      if(this.responseData.Success === false){

        let alert = this.alertCtrl.create({
          title: this.responseData.Message,
          subTitle: 'unable to sign up, please check your details',
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
          subTitle: 'Congratulations! Your account has been created,' + 
          ' head to the login page to startn using the service',
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
          subTitle: 'Unable to sign up, please check your network connection and try again',
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
