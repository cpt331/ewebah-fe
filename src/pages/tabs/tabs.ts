//======================================
//
//Name: tabs.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//
//======================================

import { Component } from '@angular/core';
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

  constructor() {
  }

}
