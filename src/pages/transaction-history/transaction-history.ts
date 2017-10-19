import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TransactionHistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transaction-history',
  templateUrl: 'transaction-history.html',
})
export class TransactionHistoryPage {
  page = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.loadTransactionHistoryWithPage(this.page);
  }

  // load the details for the page into a list

  loadTransactionHistoryWithPage(pageNo){

 // make one of these for each item returned by the transaction 
    // <ion-item>
    //   <ion-avatar item-start>
    //     <img src="img/avatar-finn.png">
    //   </ion-avatar>
    //   <h2>Finn</h2>
    //   <h3>Don't Know What To Do!</h3>
    //   <p>I've had a pretty messed up day. If we just...</p>
    // </ion-item>


  }

  // move to the next page of transaction details.
  nextPage(){
    this.page = this.page +1;
    this.loadTransactionHistoryWithPage(this.page);

  }

  previousPage(){
    this.page = this.page -1;
    this.loadTransactionHistoryWithPage(this.page);
    
      }

}
