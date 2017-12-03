//======================================
//
//Name: admin-car.module.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Steven Innes
//Contributor: Shawn Burriss
//
//======================================

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCarPage } from './admin-car';

@NgModule({
  declarations: [
    AdminCarPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCarPage),
  ],
})
export class AdminCarPageModule {}
