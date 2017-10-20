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
  transactionHistory: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.transactionHistory = [
      'Bread',
      'Milk',
      'Cheese',
      'Snacks',
      'Apples',
      'Bananas',
      'Peanut Butter',
      'Chocolate',
      'Avocada',
      'Vegemite',
      'Muffins',
      'Paper towels'
  ];
  }

  ionViewDidLoad() {
    this.loadTransactionHistoryWithPage(this.page);
  }

  // load the details for the page into a list

  loadTransactionHistoryWithPage(pageNo){




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
