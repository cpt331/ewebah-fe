import { Component } from '@angular/core';
import { NavController, App, IonicPage, NavParams, Platform } from 'ionic-angular';
import { ReturnServiceProvider } from '../../providers/return-service/return-service';
import {Geolocation} from '@ionic-native/geolocation';

import { SettingsPage } from '../settings/settings';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-return',
  templateUrl: 'return.html'
})
export class ReturnPage {

    // declared variables

    responseData : any;
    selectedCarData = {"Model":"","CarCategory":"","Make":"","Transmission":"",
      "BillingRate":"","Id":""};
    loader;
    userLat;
    userLong;

    private currentUser = {Name:'',Token:'',Email:'',HasOpenBooking:false,OpenBookingId:-1};
    private checkInProgress = false;

  constructor(public navCtrl: NavController, public platform: Platform,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation, 
    public alertCtrl: AlertController,
    public returnServiceProvider: ReturnServiceProvider) {

           
      const data = JSON.parse(localStorage.getItem('userData'));
      console.log(data);
        this.currentUser.Name = data.Name;
        this.currentUser.Email = data.Email;
        this.currentUser.Token = data.access_token;
        this.currentUser.HasOpenBooking = data.HasOpenBooking;
        this.currentUser.OpenBookingId = data.OpenBookingId;
  }

  ionViewDidLoad() {

    console.log("what?");
    this.showLoading()
    // get the users current location
    this.geolocation.getCurrentPosition().then((position) => {
      
            this.userLat = position.coords.latitude;
            this.userLong = position.coords.longitude;
    }), err => {
      
              let alert = this.alertCtrl.create({
                title: this.responseData.Message,
                subTitle: 'Cannot get current location. Please check your location settings',
                buttons: [{
                  text: 'Ok',
                  handler: () => {
                  }}]
            });
            alert.present();
                
              }

    // deal with no location

    if(this.currentUser.HasOpenBooking){
      this.returnServiceProvider.checkCurrentBooking(this.currentUser.Token,this.currentUser.OpenBookingId,
        this.userLat, this.userLong).then((returnDetails) =>{

          // display details
          document.getElementById("bookingHeader").innerHTML = "Current booking details:";
          document.getElementById("Message").innerHTML = this.responseData.Message;
          document.getElementById("City").innerHTML = this.responseData.City;
          document.getElementById("TotalHours").innerHTML = this.responseData.TotalHours;
          document.getElementById("HourlyRate").innerHTML = this.responseData.HourlyRate;
          document.getElementById("TotalAmount").innerHTML = this.responseData.TotalAmount;


          this.dismissLoading();
        }), err => {
          
                  let alert = this.alertCtrl.create({
                    title: this.responseData.Message,
                    subTitle: 'unable to get booking details, please try again later',
                    buttons: [{
                      text: 'Ok',
                      handler: () => {
                      }}]
                });
                alert.present();
                    
                   }}

    else
    {
      this.dismissLoading();
      document.getElementById("returnButton").hidden = true;
      document.getElementById("Model").innerHTML = "no current booking";

    }

  }


  returnCar(){

    // get the users current location
    this.geolocation.getCurrentPosition().then((position) => {
      
            this.userLat = position.coords.latitude;
            this.userLong = position.coords.longitude;
    });

    if(this.currentUser.HasOpenBooking){

      //show alert confirm
      // let alert = this.alertCtrl.create({
      //   title: this.responseData.Message,
      //   subTitle: 'Confirm car return',
      //   buttons: [{
      //     text: 'Ok',
      //     handler: () => {
      //     }}]
      //   });
      //   alert.present();

      // attempt return
      this.showLoading()
      this.returnServiceProvider.closeCurrentBooking(this.currentUser.Token,this.currentUser.OpenBookingId,
        this.userLat, this.userLong).then((returnDetails) =>{

          // return successful ...
          this.responseData = returnDetails;

          document.getElementById("bookingHeader").innerHTML = "Booking Completed";
          document.getElementById("Message").innerHTML = this.responseData.Message;
          document.getElementById("City").innerHTML = this.responseData.City;
          document.getElementById("TotalHours").innerHTML = this.responseData.TotalHours;
          document.getElementById("HourlyRate").innerHTML = this.responseData.HourlyRate;
          document.getElementById("TotalAmount").innerHTML = this.responseData.TotalAmount;

          this.dismissLoading();


        }

        ), err => {

        let alert = this.alertCtrl.create({
          title: this.responseData.Message,
          subTitle: 'unable to return car',
          buttons: [{
            text: 'Ok',
            handler: () => {
            }}]
      });
      alert.present();
          
        }};

        
      }

    //loading/spinner functions
    showLoading() {
      if(!this.loader){
          this.loader = this.loadingCtrl.create({
            content: "loading details...",
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
