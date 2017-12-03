//======================================
//
//Name: login.module.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//
//======================================

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {}
