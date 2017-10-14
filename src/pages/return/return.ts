import { Component } from '@angular/core';
import { NavController, App, IonicPage, NavParams, Platform } from 'ionic-angular';
import { ReturnServiceProvider } from '../../providers/return-service/return-service';

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
    userPostData = {"name":"","token":"","email":"","permission":"","carStatus":""};
    mapPins = new Map();
    currentmarker : any;
    selectedCarData = {"Model":"","CarCategory":"","Make":"","Transmission":"",
      "BillingRate":"","Id":""};
    loader;
    userPosLat;
    userPosLong;

  constructor(public navCtrl: NavController, public platform: Platform,
    public loadingCtrl: LoadingController) {

    const data = JSON.parse(localStorage.getItem('userData'));
    
      this.userPostData.name = data.Name;
      this.userPostData.email = data.Email;
      this.userPostData.token = data.access_token;
           

  }

  ionViewDidLoad() {
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
