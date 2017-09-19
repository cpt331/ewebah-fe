import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // create a storage structure for the returned values
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

    // hard coded inputs for ease of build
    this.authService.postDataLogin('user1@gmail.com', 'password1').then((result) => {
      this.responseData = result;
      console.log(this.responseData);

      //save collected info for later use
      localStorage.setItem('userData', JSON.stringify(this.responseData));

      this.navCtrl.push(TabsPage, {}, {animate: false});
    }, (err) => {
      // Error log
    });
  }

}
