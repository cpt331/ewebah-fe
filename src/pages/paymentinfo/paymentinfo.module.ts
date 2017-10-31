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
