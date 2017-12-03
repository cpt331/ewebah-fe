//======================================
//
//Name: welcome.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//Contributor: Drew Gamble, Steven Innes, Shawn Burriss
//
//======================================

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  login()
  {
    this.navCtrl.push(LoginPage);
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

}
