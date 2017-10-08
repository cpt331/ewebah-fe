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
  


  constructor(public navCtrl: NavController, public app: App, 
    public alertCtrl: AlertController, public authService: AuthServiceProvider, 
    public geolocation: Geolocation, public platform: Platform) {

    const data = JSON.parse(localStorage.getItem('userData'));
  
    this.userPostData.Name = data.Name;
    this.userPostData.Email = data.Email;
    this.userPostData.Token = data.access_token;
  
         
  }
    //more map stuff
  ionViewDidLoad() {
      this.loadMap();
  }


  loadMap() {
    //get user location
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng= new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
    //set map options
      let mapOptions = {
        center: latLng,
        zoom: 12,
        mapTypeId: 'roadmap'
      }
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

      this.authService.getAllCars(this.userPostData.Token).then((result) => {
        this.carsData = result;
        // console.log(this.carsData[0]);
        // console.log(this.carsData[17].Model);
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
  this.selectedCarData.Model = this.carsData[id].Model;
  this.selectedCarData.CarCategory = this.carsData[id].CarCategory;
  this.selectedCarData.Make = this.carsData[id].Make;
  this.selectedCarData.Transmission = this.carsData[id].Transmission;
  this.selectedCarData.BillingRate = this.carsData[id].BillingRate;
  this.selectedCarData.Id = this.carsData[id].Id;

  marker.setAnimation(google.maps.Animation.BOUNCE);
  this.currentmarker = marker;


}


}
