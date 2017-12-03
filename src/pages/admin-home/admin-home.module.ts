//======================================
//
//Name: admin-home.module.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Steven Innes
//
//======================================

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminHomePage } from './admin-home';

@NgModule({
  declarations: [
    AdminHomePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminHomePage),
  ],
})
export class AdminHomePageModule {}
