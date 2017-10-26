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
