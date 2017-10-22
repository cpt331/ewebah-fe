import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-paymentinfo',
  templateUrl: 'paymentinfo.html'
})
export class PaymentInfoPage {
  loader;
  paymentInfo: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authService: AuthServiceProvider) {
    this.paymentInfo = formBuilder.group({
      ccName: ["", Validators.compose([Validators.maxLength(120), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      ccNum: ["", Validators.compose([Validators.maxLength(16), Validators.pattern('[0-9]*'), Validators.required])],
      ccExpiry: ["", Validators.compose([Validators.required])],
      ccV: ["", Validators.compose([Validators.minLength(3), Validators.maxLength(4), Validators.required])]
    })

}
}
