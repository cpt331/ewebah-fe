import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PaymentInfoPage } from '../paymentinfo/paymentinfo';
import { TransactionHistoryPage} from '../transaction-history/transaction-history';
import { PersonalDetailsPage } from '../personal-details/personal-details'


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {

  }
  
  
  paymentSettings()
    {
      this.navCtrl.push(PaymentInfoPage);
    }

  accountSettings()
  {
     this.navCtrl.push(PersonalDetailsPage);
  }

  // paymentSettings(){
  //   // this.navCtrl.push(paymentSettingsPage);
  // }

  transactioinHistory(){
    this.navCtrl.push(TransactionHistoryPage);
  }

}
