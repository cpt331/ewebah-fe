import { Component } from '@angular/core';
import { NavController, App, Platform, ModalController} from 'ionic-angular';

import { HomePage } from '../home/home';
import { ReturnPage } from '../return/return';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ReturnPage;
  tab3Root = SettingsPage;

  constructor(public app: App) {

  }

  logout(){
    // Remove API token 
    localStorage.clear();
    setTimeout(() => this.backToWelcome(), 100);
  }

  backToWelcome(){
  const root = this.app.getRootNav();
  root.popToRoot();
  }
}
