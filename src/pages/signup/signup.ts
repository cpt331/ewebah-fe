import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.signupForm = formBuilder.group({
      firstName: ["", Validators.compose([Validators.maxLength(90), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: [""],
      email: [""],
      password: [""],
      dob: [""],
      licence: [""],
      phonenumber: [""],
      address1: [""],
      address2: [""],
      suburb: [""],
      state: [""],
      postcode: [""]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
