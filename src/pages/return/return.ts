import { Component } from '@angular/core';
import { NavController, App, IonicPage, NavParams, Platform } from 'ionic-angular';
import { ReturnServiceProvider } from '../../providers/return-service/return-service';
import {Geolocation} from '@ionic-native/geolocation';

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
    bookingData = {Message: "", City: "",TotalHours: "", HourlyRate:"",TotalAmount: "", Success: ""};
    loader;
    userLat = -37.8136;
    userLong = 144.9631;

    private currentUser = {Name:'',Token:'',Email:'',HasOpenBooking:false,OpenBookingId:-1};
    private checkInProgress = false;

  constructor(public navCtrl: NavController, public platform: Platform,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation, 
    public alertCtrl: AlertController,
    public returnServiceProvider: ReturnServiceProvider) {

           
      const data = JSON.parse(localStorage.getItem('userData'));
        this.currentUser.Name = data.Name;
        this.currentUser.Email = data.Email;
        this.currentUser.Token = data.access_token;
        this.currentUser.HasOpenBooking = data.HasOpenBooking;
        this.currentUser.OpenBookingId = data.OpenBookingId;
        
  }

  
  ionViewDidLoad() {
    if (document.getElementById("returnButton").style.display === "none") {
      document.getElementById("returnButton").style.display = "block";
    }

    if(this.currentUser.HasOpenBooking){
    this.showLoading()
    // get the users current location
    this.geolocation.getCurrentPosition().then((position) => {
      
            this.userLat = position.coords.latitude;
            this.userLong = position.coords.longitude;
    }, 
    // deal with no location
    err => {
      
              let alert = this.alertCtrl.create({
                title: "Location Error",//this.responseData.Message,
                subTitle: 'Cannot get current location. Please check your location settings',
                buttons: [{
                  text: 'Ok',
                  handler: () => {
                    this.dismissLoading();
                  }}]
            });
            alert.present();
                
              })

    // continue on with the default location for now

    
      this.returnServiceProvider.checkCurrentBooking(this.currentUser.Token,this.currentUser.OpenBookingId,
        this.userLat, this.userLong).then((returnDetails) =>{

          // display details
          document.getElementById("bookingHeader").innerHTML = "Current booking details:";


          // return successful ...
          this.responseData = returnDetails;
          console.log(this.responseData);

          if(this.responseData.Success)
          {
            document.getElementById("Message").innerHTML = this.responseData.Message;
            document.getElementById("City").innerHTML = this.responseData.City;
            document.getElementById("TotalHours").innerHTML = this.responseData.TotalHours;
            document.getElementById("HourlyRate").innerHTML = this.responseData.HourlyRate;
            document.getElementById("TotalAmount").innerHTML = this.responseData.TotalAmount;
          }
          else{
            console.log(this.responseData.Message)
            document.getElementById("bookingHeader").innerHTML = "No booking found:";
            document.getElementById("returnButton").style.display = "none";
            document.getElementById("Message").innerHTML = this.responseData.Message;

          }


          this.dismissLoading();
        }, err => {
          
                  let alert = this.alertCtrl.create({
                    title: "Something went wrong :/",
                    subTitle: 'unable to get booking details, please try again later',
                    buttons: [{
                      text: 'Ok',
                      handler: () => {
                        this.dismissLoading();
                      }}]
                });
                alert.present();
                    
        })}

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
          this.responseData = JSON.stringify(returnDetails);

          document.getElementById("bookingHeader").innerHTML = "Booking Completed";
          document.getElementById("Message").innerHTML = this.responseData.Message;
          document.getElementById("City").innerHTML = this.responseData.City;
          document.getElementById("TotalHours").innerHTML = this.responseData.TotalHours;
          document.getElementById("HourlyRate").innerHTML = this.responseData.HourlyRate;
          document.getElementById("TotalAmount").innerHTML = this.responseData.TotalAmount;

          this.dismissLoading();


        }

        , err => {

        let alert = this.alertCtrl.create({
          title: "Something went wrong",
          subTitle: 'Unable to return car, please try again',
          buttons: [{
            text: 'Ok',
            handler: () => {
              this.dismissLoading();
            }}]
      });
      alert.present();
          
        })};

        
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
