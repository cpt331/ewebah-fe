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
    "PhoneNumber":"",
    "DateOfBirth":""
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
    

      this.updateForm = formBuilder.group({
        firstName: ["", Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        lastName: ["", Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
        email: ["", Validators.compose([Validators.maxLength(255), Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$"), Validators.required])],
        password: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(255), Validators.required])],
        passwordConfirm: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(255), Validators.required])],
        dob: ["", Validators.compose([Validators.required])],
        address1: ["", Validators.compose([Validators.required])],
        address2: ["", Validators.compose([Validators.required])],
        suburb: ["", Validators.compose([Validators.required])],
        state: ["", Validators.compose([Validators.required])],
        postcode: ["", Validators.compose([Validators.required])],
        licence: ["", Validators.compose([Validators.minLength(5), Validators.maxLength(20), Validators.required])],
        licenceState:["", Validators.compose([Validators.required])],
        phone: ["", Validators.compose([Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[+0-9 ]*'), Validators.required])]//,
      })
      

    this.loadUserData(); 
      //this.getUserRegistrationDetails();
    
    }
   
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalDetailsPage');
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
  this.authService.recieveUpdateData().then((result) =>{
this.responseData =result;

    console.log("result is "+result);
  });
}

updatePostData()
{
this.authService.postUpdateUserInfo(this.updateForm.value.dob,
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

  
  console.log(result);
})
}
  
  
}

