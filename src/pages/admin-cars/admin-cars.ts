import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CarServiceProvider } from '../../providers/car-service/car-service';
import { AdminCarPage } from '../admin-car/admin-car';
/**
 * Generated class for the AdminCarsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-cars',
  templateUrl: 'admin-cars.html',
})
export class AdminCarsPage {

  loading = true;
  cars = null;
  currentUser = {access_token: "", Name: "",Email: "",Id: "", token_type:"",HasOpenBooking: false, OpenBookingId:-1};

  constructor(public navCtrl: NavController
    , public navParams: NavParams
  , public carService: CarServiceProvider) {
    
      this.loadUserData();
      this.loadCars();

  }

  loadCar(car){
    this.navCtrl.push(AdminCarPage, {car: car}, {animate: true});
  }
  loadCars(){
    this.carService.getAllCars(this.currentUser.access_token).then((result) => {
        console.log(result);
        this.cars = result;
        this.loading = false;
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminCarsPage');
  }
  loadUserData(){
    const data = JSON.parse(localStorage.getItem('userData'));
    this.currentUser.Name = data.Name;
    this.currentUser.Email = data.Email;
    this.currentUser.access_token = data.access_token;
    this.currentUser.token_type = data.token_type
    this.currentUser.Id = data.Id
    this.currentUser.HasOpenBooking = data.HasOpenBooking;
    this.currentUser.OpenBookingId = data.OpenBookingId;
  }

}
