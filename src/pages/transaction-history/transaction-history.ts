//======================================
//
//Name: transaction-history.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//
//======================================

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransactionHistoryServiceProvider } 
  from '../../providers/transaction-history-service/transaction-history-service';


@IonicPage()
@Component({
  selector: 'page-transaction-history',
  templateUrl: 'transaction-history.html',
})
export class TransactionHistoryPage {
  page = 1;
  pageSize = 15;
  transactionHistoryResult: any;
  transactionHistory: any;
  transactionHistoryTest: any;
  private currentUser = {access_token: "", Name: "",Email: "",Id: "", 
  token_type:"",HasOpenBooking: false, OpenBookingId:-1};

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public transService: TransactionHistoryServiceProvider,) {

    this.loadUserData()

  }

  ionViewDidLoad() {
    this.loadTransactionHistoryWithPage(this.page, this.pageSize);
  }

  // load the details for the page into a list

  loadTransactionHistoryWithPage(pageNo, pageSize){

    this.transService.getTransactionHistory(this.currentUser.access_token, 
      pageNo, pageSize).then((result) => {
      this.transactionHistoryResult = result;
      this.transactionHistory = this.transactionHistoryResult.Bookings;

    if(this.transactionHistory[0] == null)
    {
      this.transactionHistory[0] = {BookingId :"No transactions", TotalHours : " 0"}
    }

    }, (err) => {
 // error handling here
    });
  }

  // move to the next page of transaction details.
  nextPage(){
    this.page = this.page +1;
    this.loadTransactionHistoryWithPage(this.page, this.pageSize);

  }

  previousPage(){
    this.page = this.page -1;
    this.loadTransactionHistoryWithPage(this.page, this.pageSize);
    
      }

// load user information from the login
loadUserData(){
  
        const data = JSON.parse(localStorage.getItem('userData'));
        this.currentUser.Name = data.Name;
        this.currentUser.Email = data.Email;
        this.currentUser.access_token = data.access_token;
        this.currentUser.token_type = data.token_type
        this.currentUser.Id = data.Id
        this.currentUser.HasOpenBooking = data.HasOpenBooking;
        this.currentUser.OpenBookingId = data.OpenBookingId;
  
      }


}
