//======================================
//
//Name: admin-home.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Steven Innes
//
//======================================

//ionic
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//custom
import { AdminCarsPage } from '../admin-cars/admin-cars';
import { AdminCarPage } from '../admin-car/admin-car';
import { AdminEmailTemplatePage } from '../admin-email-template/admin-email-template';


@IonicPage()
@Component({
  selector: 'page-admin-home',
  templateUrl: 'admin-home.html',
})

//this is the administration home page and hows a list of available options
export class AdminHomePage {

  adminCarsPage = AdminCarsPage;
  adminCarPage = AdminCarPage;
  adminEmailTemplatePage = AdminEmailTemplatePage;
  currentUser = { access_token: "", 
                  Name: "",
                  Email: "",
                  Id: "", 
                  token_type:"",
                  HasOpenBooking: false, 
                  OpenBookingId:-1};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loadUserData();
  }

  //load the page selected by the user
  loadPage(page){
    this.navCtrl.push(page, {}, {animate: true});
  }

  //load the current user from local storage
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
