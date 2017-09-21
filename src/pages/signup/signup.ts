import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {
    this.signupForm = formBuilder.group({
      firstName: ["", Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: ["", Validators.compose([Validators.maxLength(60), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: ["", Validators.compose([Validators.maxLength(255), Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$"), Validators.required])],
      password: ["", Validators.compose([Validators.minLength(7), Validators.maxLength(255), Validators.required])],
      dob: ["", Validators.compose([Validators.required])],
      licence: ["", Validators.compose([Validators.minLength(5), Validators.maxLength(20), Validators.required])],
      phone: ["", Validators.compose([Validators.minLength(8), Validators.maxLength(15), Validators.pattern('[+0-9 ]*'), Validators.required])],
      address1: [""],
      address2: [""],
      suburb: [""],
      state: [""],
      postcode: ["", Validators.compose([Validators.minLength(4), Validators.maxLength(4), Validators.pattern('[0-9 ]*')])]
    })
  }

  ionViewDidLoad() {
  }

}
