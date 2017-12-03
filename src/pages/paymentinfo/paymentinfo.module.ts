//======================================
//
//Name: paymentinfo.module.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//Contibutor: Drew Gamble
//
//======================================

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentInfoPage } from './paymentinfo';

@NgModule({
  declarations: [
    PaymentInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentInfoPage),
  ],
})
export class PaymentInfoPageModule {}
