import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AdminCarsPage } from '../admin-cars/admin-cars';
import { CarServiceProvider } from '../../providers/car-service/car-service'
import { UpdateCarRequest } from '../../providers/car-service/update-car-request';
import { UpdateCarResponse } from '../../providers/car-service/update-car-response';
import { CarCategory } from '../../providers/car-service/car-category';
import { City } from '../../providers/car-service/city';

/**
 * Generated class for the AdminCarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-car',
  templateUrl: 'admin-car.html',
})
export class AdminCarPage {

  private carForm : FormGroup;
  private formSubmitting : boolean = false;
  private car = null;
  private currentUser = {access_token: "", Name: "",Email: "",Id: "", token_type:"",HasOpenBooking: false, OpenBookingId:-1};
  private updateCarResponse : UpdateCarResponse = null;
  private updateInProgress : boolean = false;
  private categoriesLoading : boolean = true;
  private categories : CarCategory[] = null;
  private statusesLoading : boolean = true;
  private statuses : string[] = null;
  private citiesLoading = true;
  private cities : City[] = null;
  
  

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder , public carService: CarServiceProvider) {
    
    this.car = this.navParams.get('car');

    if(!this.car){
      this.car = {
          Id: null,
          Make: '',
          Model: '',
          CarCategory: null,
          Transmission: null,
          Suburb: '',
          Status: '',
          LatPos: '',
          LongPos: ''
      };
    }
    
    this.carForm = this.formBuilder.group({
      Make: [this.car.Make, Validators.required],
      Model: [this.car.Model, Validators.required],
      CarCategory: [this.car.CarCategory, Validators.required],
      Transmission: [this.car.Transmission, Validators.required],
      Suburb: [this.car.Suburb, Validators.required],
      Status: [this.car.Status, Validators.required],
      LatPos: [this.car.LatPos, Validators.required],
      LongPos: [this.car.LongPos, Validators.required]
    });


  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminCarPage');
    this.loadUserData();
    this.loadCategories();
    this.loadStatuses();
    this.loadCities();
  }

  loadCities()  {
    let subscription = this.carService.getCities(this.currentUser.access_token)
    .subscribe(
    value => this.cities = value,
    error => this.cities = null,
    () => this.citiesLoading = false
  );
  }

  loadCategories()  {
    let subscription = this.carService.getCategories(this.currentUser.access_token)
    .subscribe(
    value => this.categories = value,
    error => this.categories = null,
    () => this.categoriesLoading = false
  );
  }

  loadStatuses()  {
    let subscription = this.carService.getStatuses(this.currentUser.access_token)
    .subscribe(
    value => this.statuses = value,
    error => this.statuses = null,
    () => this.statusesLoading = false
  );
  }

  submitForm(){
    console.log('submit!');
    console.log(this.carForm.value.Make);
    console.log(this.carForm.value.Model);

    console.log(this.carForm);

    this.updateInProgress = true;

    let request = new UpdateCarRequest();

    if(this.car.Id != null){
      request.Id = this.car.Id;
    }

    request.Make = this.carForm.value.Make;
    request.Model = this.carForm.value.Model;
    request.CarCategory = this.carForm.value.CarCategory;
    request.Transmission = this.carForm.value.Transmission;
    request.Suburb = this.carForm.value.Suburb;
    request.Status = this.carForm.value.Status;
    request.LatPos = this.carForm.value.LatPos;
    request.LongPos = this.carForm.value.LongPos;

    let subscription = this.carService.updateCar(request, this.currentUser.access_token)
          .subscribe(
          value => function(value){

            this.updateCarResponse = value;
            this.processResponse(value);

          },
          error => function(error){
            this.updateCarResponse = null
          },
          () => this.updateInProgress = false
        );

    //this.navCtrl.push(AdminCarsPage, {}, {animate: true});
  
  }
  processResponse(response){

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
