//======================================
//
//Name: admin-email-template.module.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Steven Innes
//Contributor: Shawn Burriss
//
//======================================

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminEmailTemplatePage } from './admin-email-template';

@NgModule({
  declarations: [
    AdminEmailTemplatePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminEmailTemplatePage),
  ],
})
export class AdminEmailTemplatePageModule {}
