import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AdminCarsPage } from '../admin-cars/admin-cars';
/**
 * Generated class for the AdminCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-car',
  templateUrl: 'admin-car.html',
})
export class AdminCarPage {

  private carForm : FormGroup;
  private car = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder ) {
    
    this.car = this.navParams.get('car');

    if(!this.car){
      this.car = {
          Make: '',
          Model: ''
      };
    }
    
    this.carForm = this.formBuilder.group({
      Make: [this.car.Make, Validators.required],
      Model: [this.car.Model, Validators.required],
    });


  }
  submitForm(){
    console.log('submit!');
    this.navCtrl.push(AdminCarsPage, {}, {animate: true});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminCarPage');
  }

}
