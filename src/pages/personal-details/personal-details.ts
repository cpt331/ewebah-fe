import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,Platform,ModalController } from 'ionic-angular';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-personal-details',
  templateUrl: 'personal-details.html',
})
export class PersonalDetailsPage {

  //declare variables
  responseData : any;
  loader;

  private currentUser = {access_token: "", Name: "",Email: "",Id: "", 
  token_type:"",HasOpenBooking: false, OpenBookingId:-1};
  updateForm: FormGroup;
 
  userRegistrationData = {
  "DriversLicenceID":"",
    "DriversLicenceState":"",
    "FirstName":"",
    "LastName":"",
    "AddressLine1":"",
    "AddressLine2":"",
    "Suburb":"",
    "State":"",
    "Postcode":"",
    "PhoneNumber":""
    }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public app: App,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider,
    public platform: Platform,
    private ModalCtrl:ModalController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder){
    
      // load the user info then get the current details for prefilling the fields
      // once details are collected construct the page.

      // this probably needs a throbber
      this.loadUserData()
      this.getUserRegistrationDetails();

      this.updateForm = formBuilder.group({
        firstName: ["", Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ["", Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        // email: ["", Validators.compose([Validators.maxLength(255), Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$")])],
        password: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(255), Validators.required])],
        passwordConfirm: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(255), Validators.required])],
        address1: ["", Validators.compose([Validators.required])],
        address2: ["", Validators.compose([Validators.required])],
        suburb: ["", Validators.compose([Validators.required])],
        state: ["", Validators.compose([Validators.required])],
        postcode: ["", Validators.compose([Validators.required])],
        licence: ["", Validators.compose([Validators.minLength(5), Validators.maxLength(20), Validators.required])],
        licenceState:["", Validators.compose([Validators.required])],
        phone: ["", Validators.compose([Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[+0-9 ]*'), Validators.required])]//,
      })
      

    
      //this.getUserRegistrationDetails();
    
    }
   

  ionViewDidLoad() {
    
  }
  
  ionViewDidEnter() {
    this.getUserRegistrationDetails();
  }

  loadUserData(){
    
          const data = JSON.parse(localStorage.getItem('userData'));
          this.currentUser.Name = data.Name;
          this.currentUser.Email = data.Email;
          this.currentUser.access_token = data.access_token;
          this.currentUser.token_type = data.token_type
          this.currentUser.Id = data.Id
          this.currentUser.HasOpenBooking = data.HasOpenBooking;
          this.currentUser.OpenBookingId = data.OpenBookingId;
    
  }


getUserRegistrationDetails()
{
  this.authService.registerDetailsCheck(this.currentUser.access_token).then((result) =>{
  this.responseData =result;
  this.updateForm = this.formBuilder.group({
    firstName: [this.responseData.FirstName, Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    lastName: [this.responseData.LastName, Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
    //email: [this.responseData.Email, Validators.compose([Validators.maxLength(255), Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$")])],
    password: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(255), Validators.required])],
    passwordConfirm: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(255), Validators.required])],
    address1: [this.responseData.AddressLine1, Validators.compose([Validators.required])],
    address2: [this.responseData.AddressLine2, Validators.compose([Validators.required])],
    suburb: [this.responseData.Suburb, Validators.compose([Validators.required])],
    state: [this.responseData.State, Validators.compose([Validators.required])],
    postcode: [this.responseData.Postcode, Validators.compose([Validators.required])],
    licence: [this.responseData.DriversLicenceID, Validators.compose([Validators.minLength(5), Validators.maxLength(20), Validators.required])],
    licenceState:[this.responseData.DriversLicenceState, Validators.compose([Validators.required])],
    phone: [this.responseData.PhoneNumber, Validators.compose([Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[+0-9 ]*'), Validators.required])]//,
  })
  });
}

updatePostData()
{
  this.showLoading();
  this.authService.postUpdateUserInfo(
  this.updateForm.value.firstName,
	this.updateForm.value.lastName,
	this.currentUser.Email,
	this.updateForm.value.licence,
    this.updateForm.value.licenceState,
    this.updateForm.value.address1,
    this.updateForm.value.address2,
    this.updateForm.value.suburb,
    this.updateForm.value.state,
    this.updateForm.value.postcode,
    this.updateForm.value.phone,
  this.currentUser.access_token).then((result) =>{

  this.responseData =result;
if(this.responseData.Success){
  this.dismissLoading();
  let alert = this.alertCtrl.create({
    title: 'User details updated',
    //subTitle: 'Your details have been successfully updated.',
    message: this.responseData.Message, buttons: [{
      text: 'Okay', handler: () => { 
      }}]});

      alert.present();
}
else
{ 
  this.dismissLoading();
  let alert = this.alertCtrl.create({
    title: 'Unable to update details',
    subTitle: 'An error has occured. Please try again', buttons: [{
      text: 'Okay', handler: () => { 
      }}]});

      alert.present();
}
  
})
}
  
  
  //loader function to stop the loader being called when it already exists
  // and dismissed when it doesn not exist
  showLoading() {
    if(!this.loader){
        this.loader = this.loadingCtrl.create({
          content: "updating details...",
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
}

