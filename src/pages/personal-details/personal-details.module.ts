//======================================
//
//Name: personal-details.module.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//
//======================================

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonalDetailsPage } from './personal-details';

@NgModule({
  declarations: [
    PersonalDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonalDetailsPage),
  ],
})
export class PersonalDetailsPageModule {}
