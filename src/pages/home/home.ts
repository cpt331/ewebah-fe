import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, App, IonicPage, NavParams, Platform } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {Geolocation} from '@ionic-native/geolocation';
import {GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,MarkerOptions,Marker} from '@ionic-native/google-maps';


import { ReturnPage } from '../return/return';
import { SettingsPage } from '../settings/settings';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  responseData : any;

  userPostData = {"Name":"","Token":"","Email":""};
  
  //Map stuff
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  carsData : any;
  mapPins = new Map();
  currentmarker : any;
  selectedCarData = {"Model":"","CarCategory":"","Make":"","Transmission":"","BillingRate":"","Id":""};
  loader;


  constructor(public navCtrl: NavController, public app: App, 
    public alertCtrl: AlertController, public authService: AuthServiceProvider, 
    public geolocation: Geolocation, public platform: Platform,
    public loadingCtrl: LoadingController,) {

    const data = JSON.parse(localStorage.getItem('userData'));
  
    this.userPostData.Name = data.Name;
    this.userPostData.Email = data.Email;
    this.userPostData.Token = data.access_token;
  
         
  }

    //loader function to stop the loader being called when it already exists
  // and dismissed when it doesn not exist
  showLoading() {
    if(!this.loader){
        this.loader = this.loadingCtrl.create({
          content: "loading map...",
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
    //more map stuff
  ionViewDidLoad() {




      this.loadMap();
  }


  loadMap() {
     // loader caller here, could wrap this in the loader instead if wanted
     this.showLoading();

    //get user location
    this.geolocation.getCurrentPosition().then((position) => {

      let latLng= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    //set map options
      let mapOptions = {
        center: latLng,
        zoom: 12,
        mapTypeId: 'roadmap'
      }
      
      // if the location is blocked the app crashes
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

      this.authService.getAllCars(this.userPostData.Token).then((result) => {
        this.carsData = result;
        // console.log(this.carsData[0]);
        // console.log(this.carsData[17].Model);
        for(let data of this.carsData)
        {
           // loader caller here, could wrap this in the loader instead if wanted
      this.dismissLoading();
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
      });

      });
   

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

getAllCars()
{
  this.authService.getAllCars(this.userPostData.Token).then((result) => {
    this.responseData = result;
})}

markerClicked(id, marker){
  if(this.currentmarker != null){
    this.currentmarker.setAnimation(google.maps.Animation.DROP);
  }

  // save for use when pushing to book
  this.selectedCarData.Model = this.carsData[id].Model;
  this.selectedCarData.CarCategory = this.carsData[id].CarCategory;
  this.selectedCarData.Make = this.carsData[id].Make;
  this.selectedCarData.Transmission = this.carsData[id].Transmission;
  this.selectedCarData.BillingRate = this.carsData[id].BillingRate;
  this.selectedCarData.Id = this.carsData[id].Id;

  // update the labels on the user screen 
  
  document.getElementById("Model").innerHTML = this.carsData[id].Make+" "+this.carsData[id].Model;
  document.getElementById("Car Category").innerHTML = this.carsData[id].CarCategory;
  //document.getElementById("Make").innerHTML = "Make: " + this.carsData[id].Make;
  //document.getElementById("Transmission").innerHTML = "Transmission: " + this.selectedCarData.Transmission;
// billing rate to be added


  marker.setAnimation(google.maps.Animation.BOUNCE);
  this.currentmarker = marker;


}


}
