import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  //map: GoogleMap;
  mapElement2: HTMLElement;

  constructor(private googleMaps: GoogleMaps, public navCtrl: NavController, 
    public navParams: NavParams, public platform: Platform, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {

    if (this.platform.is('android')){
      console.log("android");
    }
    // check if being loaded on a device. If loaded on a device use the native maps else use javaScript API
    if (this.platform.is('cordova')){
      this.loadMap();
    }
    else{
      this.loadMap2();
    }
  }

 loadMap() {

  console.log("its coming in here")
    this.mapElement2 = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };
    this.map = this.googleMaps.create(this.mapElement2, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: -34.9290,
              lng: 138.6010,
              zoom: 25
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }



  loadMap2(){
    console.log("im mobile but it didn't load")

    //let position = this.geolocation.getCurrentPosition();

       let latLng = new google.maps.LatLng(-34.9290, 138.6010);
       let latLng2 = new google.maps.LatLng(-34.9290, 138.6110);
    
       let mapOptions = {
         center: latLng,
         zoom: 10,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }
    
       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    

       let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });

      let marker2 = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng2
      });



     }
}