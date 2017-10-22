import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PaymentInfoPage } from '../paymentinfo/paymentinfo';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {

  }
  
  
    paymentInfo()
    {
      this.navCtrl.push(PaymentInfoPage);
    }

}
