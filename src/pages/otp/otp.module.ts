//======================================
//
//Name: otp-module.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Shawn Burriss
//
//======================================

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
