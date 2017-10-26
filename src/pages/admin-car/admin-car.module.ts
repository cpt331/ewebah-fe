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
