//ionic
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//custom
import { CarServiceProvider } from '../../providers/car-service/car-service';
import { AdminCarPage } from '../admin-car/admin-car';

@IonicPage()
@Component({
  selector: 'page-admin-cars',
  templateUrl: 'admin-cars.html',
})

//this page shows a list of cars which can be selected to administer
export class AdminCarsPage {

  //the initial state is loading which shows a spinner to let the user know
  loading = true;
  cars = null;
  currentUser = { access_token: "", 
                  Name: "",
                  Email: "",
                  Id: "", 
                  token_type:"",
                  HasOpenBooking: false, 
                  OpenBookingId:-1};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public carService: CarServiceProvider) {
    
    //load the current user data from storage
    this.loadUserData();

    //load a list of cars from the API
    this.loadCars();

  }

  //move to the administer car screen and pass in the selected car
  loadCar(car){
    this.navCtrl.push(AdminCarPage, {car: car}, {animate: true});
  }

  //load a list of cars from the API
  loadCars(){
    this.carService.getAllCars(this.currentUser.access_token).then((result) => {
        this.cars = result;
        this.loading = false;
    });
  }

  //load the current user data from storage
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
