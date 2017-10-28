import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, App, Platform, ModalController} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CarServiceProvider } from '../../providers/car-service/car-service';
import { BookingServiceProvider } from '../../providers/booking-service/booking-service';
import {Geolocation} from '@ionic-native/geolocation';
import {GoogleMaps, GoogleMap, GoogleMapsEvent,
  GoogleMapOptions, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';


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

  responseData : any;
  // userPostData = {"name":"","token":"","email":"","permission":"","carStatus":""};
  private currentUser = {access_token: "", Name: "",Email: "",Id: "", 
  token_type:"",HasOpenBooking: false, OpenBookingId:-1};
  @ViewChild('map') 
  mapElement: ElementRef;
  map: any;
  carsData : any;
  mapPins = new Map();
  currentmarker : any;
  selectedCarData = {"Model":"","CarCategory":"","Make":"","Transmission":"","BillingRate":"","Id":"","Suburb":""};
  loader;
  userPosLat;
  userPosLong;
  address;
  geo: any

  latitude: number = 0;
  longitude: number = 0;


  constructor(public navCtrl: NavController, public app: App, 
    public alertCtrl: AlertController, public authService: AuthServiceProvider,
    public carService: CarServiceProvider,public bookingService: BookingServiceProvider,
    public geolocation: Geolocation, public platform: Platform,
private ModalCtrl:ModalController, public loadingCtrl: LoadingController) {


  const data = JSON.parse(localStorage.getItem('userData'));
  console.log(data);
  this.currentUser.Name = data.Name;
  this.currentUser.Email = data.Email;
  this.currentUser.access_token = data.access_token;
  this.currentUser.token_type = data.token_type
  this.currentUser.Id = data.Id
  this.currentUser.HasOpenBooking = data.HasOpenBooking;
  this.currentUser.OpenBookingId = data.OpenBookingId;

    
    this.address = {
      place: ''   
    };  
  }

    // when the view is first shown
  ionViewDidLoad() {
    console.log(this.currentUser.OpenBookingId);

      this.loadMap();

  }
    
  useCurrentLocation(){
      this.geolocation.getCurrentPosition().then((currentpos) => {
        let latLng= new google.maps.LatLng(currentpos.coords.latitude, currentpos.coords.longitude);
        alert(latLng)
        this.updateMapLocation(latLng)
      }, err => {
    
          // handle location error
    
          if(err.message.indexOf("Only secure origins are allowed") == 0) {
            this.dismissLoading();
            this.defaultMelbourneLocation();
          }
          else if(err.TIMEOUT){
            alert("Browser geolocation error !\n\nTimeout. \n\nMelbourne default location");
            this.dismissLoading();
            this.defaultMelbourneLocation();
          }
          else if(err.POSITION_UNAVAILABLE){
            alert("Browser geolocation error !\n\nPosition unavailable. \n\nMelbourne default location");
            this.dismissLoading();
            this.defaultMelbourneLocation();
          }
        });
    }

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
    alert(latLng)
    this.updateMapLocation(latLng);
   });
  }
  
  updateMapLocation(latLng)
  {
    // if the location is blocked the app crashes
    this.map = new google.maps.Map(this.map.panTo(latLng))
  }

  loadMap() 
  {
    // loader caller here, could wrap this in the loader instead if wanted
    this.showLoading();
    
    //get user location
    this.geolocation.getCurrentPosition().then((position) => 
    {

      let latLng= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            
      //set map options
      let mapOptions = 
      {
        center: latLng,
        zoom: 12,
        mapTypeId: 'roadmap'
      }

      // if the location is blocked the app crashes
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

      this.carService.getAllCars(this.currentUser.access_token).then((result) => {
        this.carsData = result;

        this.dismissLoading();


        for(let data of this.carsData)
        {
          
          if (data.status == "Available")
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
        alert("Browser geolocation error !\n\nTimeout. \n\nMelbourne default location");
        this.dismissLoading();
        this.defaultMelbourneLocation();
      }
      else if(err.POSITION_UNAVAILABLE){
        alert("Browser geolocation error !\n\nPosition unavailable. \n\nMelbourne default location");
        this.dismissLoading();
        this.defaultMelbourneLocation();
      }
    });
  }


  markerClicked(id, marker)
  {
    if(this.currentmarker != null)
    {
      this.currentmarker.setAnimation(google.maps.Animation.DROP);
    }

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
    
    
    console.log("current location of vehicle is" + this.selectedCarData.Suburb);
   
    // update the labels on the user screen //
    // Car Make and Model
    document.getElementById("Model").innerHTML = this.carsData[id].Make+" "+this.carsData[id].Model;
    //Car Transmission and category
    document.getElementById("Transmission").innerHTML = Transmission + " " +
     this.carsData[id].CarCategory +" ";
    //Car Billing Rate
    document.getElementById("BillingRate").innerHTML = "Rate per hour is $" + this.selectedCarData.BillingRate;
    
    
    
       //let carImage=document.getElementById("carPic") as HTMLImageElement;
       // carImage.src ="assets/images/newSmallCarImage.png";
           
      
       console.log("this car's details are as follows" + 
       this.selectedCarData.Model + " "+
       this.selectedCarData.CarCategory +" "+
       this.selectedCarData.Make +" "+
       this.selectedCarData.Suburb +" "+
       this.selectedCarData.Id);
    
    

    // billing rate to be added

    marker.setAnimation(google.maps.Animation.BOUNCE);
    this.currentmarker = marker;
  }


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
      };
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


  // update the labels on the user screen 
  
  // document.getElementById("Model").innerHTML = this.carsData[id].Make+" "+this.carsData[id].Model;
  // document.getElementById("Car Category").innerHTML = this.carsData[id].CarCategory;
  //document.getElementById("Make").innerHTML = "Make: " + this.carsData[id].Make;
  //document.getElementById("Transmission").innerHTML = "Transmission: " + this.selectedCarData.Transmission;
// billing rate to be added


  // marker.setAnimation(google.maps.Animation.BOUNCE);
  // this.currentmarker = marker;


//}

if(!this.currentUser.HasOpenBooking)
{

    if(this.selectedCarData.Make != null && this.selectedCarData.Make != ""){


      var transString;
      if(this.selectedCarData.Transmission == "AT"){
        transString = 'automatic';
      }
      else{
        transString = 'manual';
      }
    let alert = this.alertCtrl.create({
      title: 'Confirm booking request',
      subTitle: 'you are about to book a ' + this.selectedCarData.Make +' -' +
      this.selectedCarData.Model +' - ' +
      transString + ', at a rate of $' +
      this.selectedCarData.BillingRate +' per hour.',
      buttons: [{
        text: 'Book',
        handler: () => {
          this.showBooking();
          // show loading spinner

          this.bookingService.bookCar(this.currentUser.access_token, this.selectedCarData.Id).then((result) => {
          // check if successful
          this.dismissLoading();
          if(result){

            this.currentUser.HasOpenBooking = true;
            this.currentUser.OpenBookingId =  parseInt(this.selectedCarData.Id);
            localStorage.setItem('userData', JSON.stringify(this.currentUser));


            let alert = this.alertCtrl.create({
              title: 'Confirm booking request',
              subTitle: 'your car is booked, head to the location to pick it up.', buttons: [{
                text: 'Okay', handler: () => { //there is no need to manually call this = alert.dismiss(); it is done automatically
                }}]});
                alert.present();
                return;
          }
          else
          {
            let alert = this.alertCtrl.create({
              title: 'Unable to book this car',
              subTitle: 'Oh no, this car cannot be booked right now. Please choose another', buttons: [{
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
else
{
  let alert = this.alertCtrl.create({
    title: 'You already have a car booked',
    subTitle: 'Please return your current booking before making another', buttons: [{
      text: 'Got it', handler: () => { 
        // send to return page??
      }}]});
      alert.present();
      return;
}

}
}
