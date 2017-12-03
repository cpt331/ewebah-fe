//======================================
//
//Name: signup.mudule.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//
//======================================

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
})
export class SignupPageModule {}
