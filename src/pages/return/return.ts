import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
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

    userLat;
    userLong;

    private currentUser = {access_token: "", Name: "",Email: "",Id: "", 
    token_type:"",HasOpenBooking: false, OpenBookingId:-1};



  constructor(public navCtrl: NavController, public platform: Platform,
    public loadingCtrl: LoadingController,
    public geolocation: Geolocation, 
    public alertCtrl: AlertController,
    public returnServiceProvider: ReturnServiceProvider) {

    this.loadUserData();
  }

  

  ionViewDidEnter() 
  {

    this.loadUserData();

    document.getElementById("returnButton").hidden = false;
    document.getElementById("returnButton").style.display = "block";


    if(!this.currentUser.HasOpenBooking)
    {

        this.dismissLoading();
        document.getElementById("returnButton").hidden = true;
        document.getElementById("Message").innerHTML = "no current booking";
        document.getElementById("City").innerHTML = "";
        document.getElementById("TotalHours").innerHTML = "";
        document.getElementById("HourlyRate").innerHTML = "";
        document.getElementById("TotalAmount").innerHTML = "";

    }
    else
    {
    this.showLoadingChecking()
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
                
              }).then(() => {

    // continue on with the default location for now

    
      this.returnServiceProvider.checkCurrentBooking(this.currentUser.access_token,this.currentUser.OpenBookingId,
        this.userLat, this.userLong).then((returnDetails) =>{

          // display details
          document.getElementById("bookingHeader").innerHTML = "Current booking details";


          // return successful ...
          this.responseData = returnDetails;


          console.log(this.responseData);




          if(this.responseData.Success)
          {
            document.getElementById("Message").innerHTML = this.responseData.Message;
            document.getElementById("City").innerHTML = "Location : " + this.responseData.City;
            document.getElementById("TotalHours").innerHTML = "Hours : " + this.responseData.TotalHours;
            document.getElementById("HourlyRate").innerHTML = "Hourly rate : " + this.responseData.HourlyRate;
            document.getElementById("TotalAmount").innerHTML = "Total : " + this.responseData.TotalAmount;
          }
          else if((this.responseData.Success == false) && (this.responseData.Message == "No cities are within a 10000m radius")){
            document.getElementById("Message").innerHTML = "You are not in an eligible return area.";
            document.getElementById("City").innerHTML = "Cars can only be returned within 10km of a capital city";
            document.getElementById("TotalHours").innerHTML = "Please to this area to return your car.";
            document.getElementById("returnButton").style.display = "none";
          }
          else{
            document.getElementById("bookingHeader").innerHTML = "No booking found";
            document.getElementById("City").innerHTML = "";
            document.getElementById("TotalHours").innerHTML = "";
            document.getElementById("HourlyRate").innerHTML = "";
            document.getElementById("TotalAmount").innerHTML = "";
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
      )}

  }


  returnCar(){

      if(this.currentUser.HasOpenBooking){
    let alert = this.alertCtrl.create({
      title: 'Confirm booking return',
      subTitle: "You will be charged " + this.responseData.TotalAmount + " for using the vehicle a total of " + 
      this.responseData.TotalHours + " hours at a rate of " + this.responseData.HourlyRate + " per hour",
      buttons: [{
        text: 'Return',
        handler: () => {

    // get the users current location
    this.geolocation.getCurrentPosition().then((position) => {
      
            this.userLat = position.coords.latitude;
            this.userLong = position.coords.longitude;
    });

    //if(this.currentUser.HasOpenBooking){

      // attempt return
      this.showLoadingReturning()
      this.returnServiceProvider.closeCurrentBooking(this.currentUser.access_token,this.currentUser.OpenBookingId,
        this.userLat, this.userLong).then((returnDetails) =>{

         // return successful ...
         this.responseData = returnDetails;

         if(this.responseData.Success)
         {
          this.currentUser.HasOpenBooking = false;
          this.currentUser.OpenBookingId =  -1;
          localStorage.setItem('userData', JSON.stringify(this.currentUser));


           document.getElementById("bookingHeader").innerHTML = " Vehicle has been returned"
           document.getElementById("Message").innerHTML = this.responseData.Message;
           document.getElementById("City").innerHTML = "Returned to " + this.responseData.City;
           document.getElementById("TotalHours").innerHTML = "Usage : " + this.responseData.TotalHours + " hours";
           document.getElementById("HourlyRate").innerHTML = "Rate per hour: " + this.responseData.HourlyRate;
           document.getElementById("TotalAmount").innerHTML = "You have been charged a total of " + this.responseData.TotalAmount;

           // hide the button
           document.getElementById("returnButton").hidden = true;
         }
         else{
           document.getElementById("bookingHeader").innerHTML = "No booking found:";
           document.getElementById("City").innerHTML = "";
           document.getElementById("TotalHours").innerHTML = "";
           document.getElementById("HourlyRate").innerHTML = "";
           document.getElementById("TotalAmount").innerHTML = "";
           document.getElementById("returnButton").style.display = "none";
           document.getElementById("Message").innerHTML = this.responseData.Message;

           // hide the button
           document.getElementById("returnButton").hidden = true;

         }
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
          
        })//}
      }},
      {
        text: 'Cancel',
        handler: () => {

        }
      }]
    });
    alert.present();
  }
  else{
    document.getElementById("bookingHeader").innerHTML = "No booking found:";
    document.getElementById("City").innerHTML = "";
    document.getElementById("TotalHours").innerHTML = "";
    document.getElementById("HourlyRate").innerHTML = "";
    document.getElementById("TotalAmount").innerHTML = "";
    document.getElementById("returnButton").style.display = "none";

    // hide the button
    document.getElementById("returnButton").hidden = true;

  }
}
  



    //loading/spinner functions
    showLoadingChecking() {
      if(!this.loader){
          this.loader = this.loadingCtrl.create({
            content: "checking bookings...",
          });
          this.loader.present();
      }
    }

    //loading/spinner functions
    showLoadingReturning() {
      if(!this.loader){
          this.loader = this.loadingCtrl.create({
            content: "Returning car...",
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
