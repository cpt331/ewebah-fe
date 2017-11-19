import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { PaymentInfoPage } from '../paymentinfo/paymentinfo';
import { TransactionHistoryPage} from '../transaction-history/transaction-history';
import { PersonalDetailsPage } from '../personal-details/personal-details'


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController, 
    public app: App ) {

  }
  
  
  paymentSettings()
    {
      this.navCtrl.push(PaymentInfoPage);
    }

  accountSettings()
  {
     this.navCtrl.push(PersonalDetailsPage);
  }

  transactioinHistory(){
    this.navCtrl.push(TransactionHistoryPage);
  }

  logout(){
    // Remove API token 
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 100);
  }

  backToWelcome(){
  const root = this.app.getRootNav();
  root.popToRoot();
  }

}
