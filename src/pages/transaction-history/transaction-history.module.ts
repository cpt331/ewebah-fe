//======================================
//
//Name: transaction-history.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//
//======================================

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransactionHistoryPage } from './transaction-history';

@NgModule({
  declarations: [
    TransactionHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(TransactionHistoryPage),
  ],
})
export class TransactionHistoryPageModule {}
