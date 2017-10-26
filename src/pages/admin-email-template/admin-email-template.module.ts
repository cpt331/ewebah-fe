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
