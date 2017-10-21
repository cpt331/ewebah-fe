import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { AdminCarsPage } from '../admin-cars/admin-cars';
import { AdminCarPage } from '../admin-car/admin-car';
import { AdminEmailTemplatePage } from '../admin-email-template/admin-email-template';

/**
 * Generated class for the AdminHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})
export class AdminHomePage {

  adminCarsPage = AdminCarsPage;
  adminCarPage = AdminCarPage;
  adminEmailTemplatePage = AdminEmailTemplatePage;
  currentUser = {access_token: "", Name: "",Email: "",Id: "", token_type:"",HasOpenBooking: false, OpenBookingId:-1};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loadUserData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminHomePage');
  }

  loadPage(page){
    this.navCtrl.push(page, {}, {animate: true});
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
