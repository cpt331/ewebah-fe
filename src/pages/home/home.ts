import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController, App} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {Geolocation} from '@ionic-native/geolocation';
import {MarkerOptions,Marker} from '@ionic-native/google-maps';


import { ReturnPage } from '../return/return';
import { SettingsPage } from '../settings/settings';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  userPostData = {"Name":"","Token":"","Email":""};
  //Map stuff
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  

  constructor(public navCtrl: NavController, public app: App, public geolocation: Geolocation) {

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
        zoom: 15,
        mapTypeId: 'roadmap'
      }
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)
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

}
