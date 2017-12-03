//======================================
//
//Name: AutocompletePage.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Drew Gamble
//
//======================================

import {Component, NgZone} from '@angular/core';
import {ViewController} from 'ionic-angular';


declare var google;

@Component({
  templateUrl: 'autocompletepage.html'
})

export class AutocompletePage {
  autocompleteItems;
  autocomplete;

  latitude: number = 0;
  longitude: number = 0;

  service = new google.maps.places.AutocompleteService();

  constructor (public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query,  componentRestrictions: {country: 'AU'} }, 
    function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () 
      {
        try{
        predictions.forEach(function (prediction) 
        {
          me.autocompleteItems.push(prediction.description);

        });
      }
      catch (e){
        me.autocompleteItems.push("no results");
      }
      });
    });
  }
}