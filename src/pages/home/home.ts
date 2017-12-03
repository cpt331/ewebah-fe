//======================================
//
//Name: home.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//Contributor: Drew Gamble, Steven Innes, Shawn Burriss
//
//======================================

import { Component,ViewChild,ElementRef , 
  ChangeDetectorRef } from '@angular/core';
import { NavController, App, Platform, 
  ModalController} from 'ionic-angular';
import { AuthServiceProvider } from 
'../../providers/auth-service/auth-service';
import { CarServiceProvider } from 
'../../providers/car-service/car-service';
import { BookingServiceProvider } from 
'../../providers/booking-service/booking-service';
import {Geolocation} from '@ionic-native/geolocation';
import { SettingsPage } from '../settings/settings';
import {AutocompletePage} from '../home/autocompletepage';
import { ReturnPage } from '../return/return';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // declared variables

  bookButtonColour = "primary";
  responseData : any;
  booking : any;
  private currentUser = {access_token: "", 
    Name: "",Email: "",Id: "", 
    token_type:"",HasOpenBooking: false, 
    OpenBookingId:-1};
  @ViewChild('map') 
  mapElement: ElementRef;
  map: any;
  carsData : any;
  mapPins = new Map();
  currentmarker : any;
  selectedCarData = {"Model":"","CarCategory":"",
    "Make":"","Transmission":"",
    "BillingRate":"","Suburb":"","Id":""};
  loader;
  userPosLat;
  userPosLong;
  address;
  geo: any
  mapLoaded = false;
  firstLoad = true;
  latitude: number = 0;
  longitude: number = 0;

// class construtor initailising the tools for later use
  constructor(public navCtrl: NavController, 
    public app: App, 
    public alertCtrl: AlertController, 
    public authService: AuthServiceProvider,
    public carService: CarServiceProvider,
    public bookingService: BookingServiceProvider,
    public geolocation: Geolocation, 
    public platform: Platform,
    private ModalCtrl:ModalController, 
    private changeDetectorRef:ChangeDetectorRef,
    public loadingCtrl: LoadingController) {

    const data = JSON.parse(localStorage.getItem('userData'));
    this.currentUser.Name = data.Name;
    this.currentUser.Email = data.Email;
    this.currentUser.access_token = data.access_token;
    this.currentUser.token_type = data.token_type
    this.currentUser.Id = data.Id
    this.currentUser.HasOpenBooking = data.HasOpenBooking;
    this.currentUser.OpenBookingId = data.OpenBookingId;
    this.address = { place: '' };  
  }

  // when the view is first shown
  ionViewDidLoad() {       
  }

  // when the view is shown on the screen
  // checks if the user is coming into the view for the first time
  // the loading of the map is determined by the first load of the view
  // if the user has an open booking they will be automatically
  // redirected to the return page instead of the main map/booking
  ionViewDidEnter() {
    document.getElementById("bookButton").hidden = true;
    document.getElementById("existingBookingInstructions").hidden = true;
    document.getElementById("Instructions").hidden = false;

    if(this.currentUser.HasOpenBooking 
        && this.firstLoad == true){
      this.firstLoad = false;
      this.navCtrl.parent.select(1);
    }

    else if (this.map == undefined){
      this.loadMap();
      this.mapLoaded = true;
    }

    else{
      this.loadUserData();
    }

    if(this.currentUser.HasOpenBooking){
      document.getElementById("bookButton").hidden = true;
      document.getElementById("existingBookingInstructions").hidden = false;
    }

  }
    
  // get the users current location for the map
  useCurrentLocation(){
      this.geolocation.getCurrentPosition().then((currentpos) => {
        let latLng= new google.maps.LatLng(currentpos.coords.latitude, 
            currentpos.coords.longitude);
        this.updateMapLocation(latLng)
      }, err => {
    
          // handle location error
    
          if(err.message.indexOf("Only secure origins are allowed") == 0) {
            this.dismissLoading();
            this.defaultMelbourneLocation();
          }
          else if(err.TIMEOUT){
            alert("Browser geolocation error !\n\nTimeout. " + 
              "\n\nMelbourne default location");
            this.dismissLoading();
            this.defaultMelbourneLocation();
          }
          else if(err.POSITION_UNAVAILABLE){
            alert("Browser geolocation error !\n\nPosition unavailable. " + 
              "\n\nMelbourne default location");
            this.dismissLoading();
            this.defaultMelbourneLocation();
          }
          else{
          }
        });
    }

  // allow the user to enter a location in the search bar by a modal display
  showAddressModal () {
    let modal = this.ModalCtrl.create(AutocompletePage);
    modal.onDidDismiss(data => {
      if(!!data){
        this.address.place = data;
        this.geo = data;
        this.geoCode(this.geo);//convert Address to lat and long
      }
    });
    modal.present();
  }

  //convert Address string to lat and long
  geoCode(address:any) {
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
    this.latitude = results[0].geometry.location.lat();
    this.longitude = results[0].geometry.location.lng();

    let latLng= new google.maps.LatLng(this.latitude,this.longitude);
    this.updateMapLocation(latLng);
   });
  }
  
  // update the area shown on the map by passing location lat and long
  updateMapLocation(latLng)
  {
    this.map.panTo(latLng);
  }

  // map loading function
  loadMap() 
  {
    // display loading throbber to the user
    this.showLoading();
    
    //get user location
    this.geolocation.getCurrentPosition().then((position) => 
    {
      let latLng = 
        new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            
      //set map options
      let mapOptions = 
      {
        center: latLng,
        zoom: 12,
        mapTypeId: 'roadmap'
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

      new google.maps.Marker({
        map: this.map,
        icon: 'assets/location.png',
        position: latLng,
      });

      // get all the cars to display on the map
      this.carService.getAllCars(this.currentUser.access_token).then((result) => {
        this.carsData = result;

        this.dismissLoading();


        // create the pins for the map showing the car locations
        for(let data of this.carsData)
        {
          
          if (data.Status === "Available")
          {
            let carPosition = new google.maps.LatLng(data.LatPos, data.LongPos);

            let marker= new google.maps.Marker({
              map: this.map,
              animation: google.maps.Animation.DROP,
              position: carPosition,
              title : "selected"
            });

            this.mapPins.set(data.Id, marker);

            google.maps.event.addListener(marker, 'click', () => {
              this.markerClicked(data.Id, marker);
          
            
            })
          }
        };
      })
    }, err => {

      // handle location error

      if(err.message.indexOf("Only secure origins are allowed") == 0) {
        this.dismissLoading();
        this.defaultMelbourneLocation();
      }
      else if(err.TIMEOUT){
        alert("Browser geolocation error !\n\nTimeout. " + 
          "\n\nMelbourne default location");
        this.dismissLoading();
        this.defaultMelbourneLocation();
      }
      else if(err.POSITION_UNAVAILABLE){
        alert("Browser geolocation error !\n\n" + 
          "Position unavailable. \n\nMelbourne default location");
        this.dismissLoading();
        this.defaultMelbourneLocation();
      }
    });
  }

// handle a user clicking on a car
// display the car information on the screen for the selected car
  markerClicked(id, marker)
  {
    document.getElementById("Instructions").hidden = true;

    if(!this.currentUser.HasOpenBooking){
      document.getElementById("bookButton").hidden = false;
    }
    if(this.currentmarker != null)
    {
      this.currentmarker.setAnimation(google.maps.Animation.NONE);
    }
    // change the button colour to visually indicate a car can be booked
    this.bookButtonColour = "secondary";
    this.changeDetectorRef.detectChanges();

    // save for use when pushing to book
    this.selectedCarData.Model = this.carsData[id].Model;
    this.selectedCarData.CarCategory = this.carsData[id].CarCategory;
    this.selectedCarData.Make = this.carsData[id].Make;
    this.selectedCarData.Transmission = this.carsData[id].Transmission;
    this.selectedCarData.BillingRate = this.carsData[id].BillingRate;
    this.selectedCarData.Id = this.carsData[id].Id;
    this.selectedCarData.Suburb = this.carsData[id].Suburb;
   
    let Transmission = "Automatic";

    if(this.selectedCarData.Transmission == "MN")
    {
      Transmission = "Manual";
    }
   
    // update the labels on the user screen //
    // Car Make and Model
    document.getElementById("Model").innerHTML = 
      this.carsData[id].Make+" "+this.carsData[id].Model;

    //Car Transmission and category
    document.getElementById("Transmission").innerHTML = 
      Transmission + " " +
     this.carsData[id].CarCategory +" ";

    //Car Billing Rate
    document.getElementById("BillingRate").innerHTML = 
      "Rate per hour is $" + this.selectedCarData.BillingRate;

    marker.setAnimation(google.maps.Animation.BOUNCE);
    this.currentmarker = marker;
  }

// if the location is blocked, Melbourne is used as a default location
// the creates the map and pins in the same way as the regular map creation
  defaultMelbourneLocation(){

    let latLng = new google.maps.LatLng(-37.8136, 144.9631);

    //set map options
    let mapOptions = 
    {
      center: latLng,
      zoom: 12,
      mapTypeId: 'roadmap'
    }


    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

    this.carService.getAllCars(this.currentUser.access_token).then((result) => {
      this.carsData = result;

      for(let data of this.carsData)
      {
        
        if (data.Status === "Available")
        {
          let carPosition = new google.maps.LatLng(data.LatPos, data.LongPos);

          let marker= new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: carPosition,
            title : "selected"
          });

          this.mapPins.set(data.Id, marker);

          google.maps.event.addListener(marker, 'click', () => {
            this.markerClicked(data.Id, marker);
        
          
          })
        }
      }
      this.dismissLoading();
    })

  }

  //loading/spinner functions

  showLoading() {
    if(!this.loader){
        this.loader = this.loadingCtrl.create({
          content: "loading map...",
        });
        this.loader.present();
    }
  }

  showBooking() {
    if(!this.loader){
        this.loader = this.loadingCtrl.create({
          content: "Booking your ride ...please wait",
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

// website button functions
  book()
  {
    this.navCtrl.push(HomePage);
  }

  return(){
    this.navCtrl.push(ReturnPage);
  }

  settings(){
    this.navCtrl.push(SettingsPage);
  }

  logout(){
    // Remove API token 
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 100);
  }

  backToWelcome(){
  const root = this.app.getRootNav();
  root.popToRoot();
  }


  // book the currently selected car
  bookThisCar(){

if(!this.currentUser.HasOpenBooking)
{

    if(this.selectedCarData.Make != null && 
      this.selectedCarData.Make != ""){


      var transString;
      if(this.selectedCarData.Transmission == "AT"){
        transString = 'automatic';
      }
      else{
        transString = 'manual';
      }
    let alert = this.alertCtrl.create({
      title: 'Confirm booking request',
      subTitle: 'you are about to book a ' + 
      this.selectedCarData.Make +' -' +
      this.selectedCarData.Model +' - ' +
      transString + ', at a rate of $' +
      this.selectedCarData.BillingRate +' per hour.',
      buttons: [{
        text: 'Book',
        handler: () => {
          // show loading spinner
          this.showBooking();
        
          this.bookingService.bookCar(this.currentUser.access_token, 
            this.selectedCarData.Id).then((result) => {
          // check if successful
          this.dismissLoading();
          this.booking = result;
          if(this.booking.Success){

            this.currentUser.HasOpenBooking = true;
            this.currentUser.OpenBookingId =  this.booking.BookingId;
            localStorage.setItem('userData', 
              JSON.stringify(this.currentUser));

            let alert = this.alertCtrl.create({
              title: 'Confirm booking request',
              subTitle: 'your car is booked, head to ' + 
                'the location to pick it up.', buttons: [{
                text: 'Okay', handler: () => { 
                }}]});
                alert.present();
                return;
          }
          // if the server returns a problem with the booking possibility
          // of the car, the user is displayed information why
          else
          {
            let alert = this.alertCtrl.create({
              title: this.booking.Message,
              subTitle: 'Oh no, this car cannot be ' + 
                'booked right now : ' 
                + this.booking.Message, buttons: [{
                text: 'Okay', handler: () => { 
                }}]});
                alert.present();
                return;
          }
        });
  
        }
      },
      {
        text: 'Cancel',
        handler: () => {

        }
      }]
    });
    alert.present();
    }
    else
    {
      let alert = this.alertCtrl.create({
      title: 'You must select a car before booking',
      subTitle: 'Tap one of the car icons to choose a car', buttons: [{
        text: 'Got it', handler: () => { 
        }}]});
        alert.present();
        return;
    }
}
// users cannot book two cars at once, this handles the 
// instance of a car already being booked by the user
else
{
  let alert = this.alertCtrl.create({
    title: 'You already have a car booked',
    subTitle: 'Please return your current ' + 
      'booking before making another', buttons: [{
      text: 'Got it', handler: () => { 
      }}]});
      alert.present();
      return;
}

}

// load the information for the current user

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
