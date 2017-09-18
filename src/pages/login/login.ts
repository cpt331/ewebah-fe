import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  enteredDetails = {"Email": "", "Password":""};
  userData = {"access_token": "", "Name": "","Email": "","Id": "", "token_type":""};
  responseData : any;

  constructor(public navCtrl: NavController, public authService: AuthServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    // needs input validation
    console.log(this.enteredDetails.Email)
    console.log(this.enteredDetails.Password)
    this.authService.postDataLogin('user1@gmail.com', 'password1').then((result) => {
      this.responseData = result;
      console.log(this.responseData);

      localStorage.setItem('userData', JSON.stringify(this.responseData));

      

      this.navCtrl.push(TabsPage, {}, {animate: false});
    }, (err) => {
      // Error log
    });
  }

}
