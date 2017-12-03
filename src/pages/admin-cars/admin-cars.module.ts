//======================================
//
//Name: admin-cars.module.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Steven Innes
//Contributor: Shawn Burriss
//
//======================================

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminCarsPage } from './admin-cars';

@NgModule({
  declarations: [
    AdminCarsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminCarsPage),
  ],
})
export class AdminCarsPageModule {}
