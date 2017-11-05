import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { otpPage } from './otp';

@NgModule({
  declarations: [
    otpPage,
  ],
  imports: [
    IonicPageModule.forChild(otpPage),
  ],
})
export class otpPageModule {}
