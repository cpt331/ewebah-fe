import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TransactionHistoryPage} from '../transaction-history/transaction-history'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {

  }

  accountSettings()
  {
    // this.navCtrl.push(AccountSettingsPage);
  }

  paymentSettings(){
    // this.navCtrl.push(paymentSettingsPage);
  }

  transactioinHistory(){
    this.navCtrl.push(TransactionHistoryPage);
  }

}
