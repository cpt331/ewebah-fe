//ionic
import { Component, ViewChild, ElementRef } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

//google
import {GoogleMaps, GoogleMap, GoogleMapsEvent,
  GoogleMapOptions, CameraPosition, MarkerOptions, Marker} 
  from '@ionic-native/google-maps';

//custom
import { AdminCarsPage } from '../admin-cars/admin-cars';
import { CarServiceProvider } from '../../providers/car-service/car-service'
import { UpdateCarRequest } from '../../providers/car-service/update-car-request';
import { UpdateCarResponse } from '../../providers/car-service/update-car-response';
import { CarCategory } from '../../providers/car-service/car-category';
import { City } from '../../providers/car-service/city';

//this stops typescript errors from occuring when using maps API
declare var google;

@IonicPage()
@Component({
  selector: 'page-admin-car',
  templateUrl: 'admin-car.html',
})

//this page is used to handle updating and creation of cars in the system
export class AdminCarPage {

  private carForm : FormGroup;
  private formSubmitting : boolean = false;
  private car = null;
  currentUser = { access_token: "", 
                  Name: "",
                  Email: "",
                  Id: "", 
                  token_type:"",
                  HasOpenBooking: false, 
                  OpenBookingId:-1};
  private updateCarResponse : UpdateCarResponse = null;
  private categoriesLoading : boolean = true;
  private categories : CarCategory[] = null;
  private statusesLoading : boolean = true;
  private statuses : string[] = null;
  private citiesLoading = true;
  private cities : City[] = null;
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private formBuilder: FormBuilder , 
    public carService: CarServiceProvider,
    public alertCtrl: AlertController,
    public geolocation: Geolocation) {
    
    //retrieve the car from navigation parameters
    this.car = this.navParams.get('car');

    //if no car was passed in, initialise a new one
    if(!this.car){
      this.car = {
          Id: null,
          Make: '',
          Model: '',
          CarCategory: null,
          Transmission: null,
          Suburb: '',
          Status: '',
          LatPos: null,
          LongPos: null
      };
    }
    
    //setup form with validation logic
    this.carForm = this.formBuilder.group({
      Make: [this.car.Make, Validators.required],
      Model: [this.car.Model, Validators.required],
      CarCategory: [this.car.CarCategory, Validators.required],
      Transmission: [this.car.Transmission, Validators.required],
      Status: [this.car.Status, Validators.required],
      LatPos: [this.car.LatPos, Validators.required],
      LongPos: [this.car.LongPos, Validators.required]
    });


  }
  
  //when the view is loaded initialise relational data for selection
  ionViewDidLoad() {
    this.loadMap();
    this.loadUserData();
    this.loadCategories();
    this.loadStatuses();
    this.loadCities();
  }

  //show a google map to indicate where the car is. if it is a new car then 
  //use the current geolocation to populate latitude and longitude
  loadMap(){

    //if the car has no co ordinates then it must be a new car
    if(this.car.LatPos == null || this.car.LongPos == null){

      //use the current location as the cars starting location
      this.geolocation.getCurrentPosition().then((position) => {

        let latLng = new google.maps.LatLng(
                position.coords.latitude, 
                position.coords.longitude);
                
        this.carForm.controls['LatPos'].setValue(position.coords.latitude);
        this.carForm.controls['LongPos'].setValue(position.coords.longitude);
  
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
  
        //load map
        this.map = new google.maps.Map(
          this.mapElement.nativeElement, 
          mapOptions);

        //set a marker at the location
        let marker = new google.maps.Marker({
          map: this.map,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
        });

  
      }, (err) => {
        console.log(err);
      });

    }
    else{
        
      let latLng = new google.maps.LatLng(this.car.LatPos, this.car.LongPos);
      
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      //load map
      this.map = new google.maps.Map(
        this.mapElement.nativeElement, 
        mapOptions);

      //set a marker at the location    
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
    }
  }
  
  //load a list of cities for selection
  loadCities()  {
    //request cities from back end API
    let subscription = this.carService.getCities(
      this.currentUser.access_token)
      .subscribe(
      value => this.cities = value,
      error => this.cities = null,
      () => this.citiesLoading = false
    );
  }

  //load a list of categories for selection
  loadCategories()  {
    //request categories from back end API
    let subscription = this.carService.getCategories(
      this.currentUser.access_token)
      .subscribe(
        value => this.categories = value,
        error => this.categories = null,
        () => this.categoriesLoading = false
      );
  }

  //load a list of statuses for selection
  loadStatuses()  {
    //request statuses from back end API
    let subscription = this.carService.getStatuses(
      this.currentUser.access_token)
      .subscribe(
        value => this.statuses = value,
        error => this.statuses = null,
        () => this.statusesLoading = false
      );
  }

  //submit the car update form and post data to back end
  submitForm(){

    //state of form is now submitting and UI will react
    this.formSubmitting = true;

    //create an update request
    let request = new UpdateCarRequest();
    if(this.car.Id != null){
      request.Id = this.car.Id;
    }
    request.Make = this.carForm.value.Make;
    request.Model = this.carForm.value.Model;
    request.CarCategory = this.carForm.value.CarCategory;
    request.Transmission = this.carForm.value.Transmission;
    request.Status = this.carForm.value.Status;
    request.LatPos = this.carForm.value.LatPos;
    request.LongPos = this.carForm.value.LongPos;

    //send API request to update car. listen for response and process
    let subscription = this.carService.updateCar(
      request, 
      this.currentUser.access_token)
          .subscribe(
            value => {
              this.processResponse(value);
            },
            error => {
              this.updateCarResponse = null;
              const alert = this.alertCtrl.create({
                title: "Something went wrong!",
                buttons: [{
                  text: 'Ok'
                }]
              });
              alert.present();
              this.formSubmitting = false;
            },
            () => this.formSubmitting = false
          );

  }

  //handle the response to an update request
  processResponse(response){
    this.updateCarResponse = response;
    //send an ionic alert to the user letting them know the status
    const alert = this.alertCtrl.create({
      title: response.Message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          if(response.Success){
            this.navCtrl.push(AdminCarsPage, {}, {animate: true});
          }
        }
      }]
    });
    alert.present();
  }

  //load the current user data from storage
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

}
