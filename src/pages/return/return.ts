import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CloseBookingCheckRequest } from '../../providers/booking-service/close-booking-check-request';
import { CloseBookingCheckResponse } from '../../providers/booking-service/close-booking-check-response';
import { CloseBookingRequest } from '../../providers/booking-service/close-booking-request';
import { CloseBookingResponse } from '../../providers/booking-service/close-booking-response';
import { OpenBookingResponse } from '../../providers/booking-service/open-booking-response';
import { BookingServiceProvider } from '../../providers/booking-service/booking-service';


@Component({
  selector: 'page-return',
  templateUrl: 'return.html'
})
export class ReturnPage {

  private currentUser = {Name:'',Token:'',Email:'',HasOpenBooking:false,OpenBookingId:-1};
  private closeBookingCheckResponse : CloseBookingCheckResponse = new CloseBookingCheckResponse();
  private checkInProgress = false;

  constructor(public navCtrl: NavController, public bookingService: BookingServiceProvider) {

    const data = JSON.parse(localStorage.getItem('userData'));
    console.log(data);
      this.currentUser.Name = data.Name;
      this.currentUser.Email = data.Email;
      this.currentUser.Token = data.access_token;
      this.currentUser.HasOpenBooking = data.HasOpenBooking;
      this.currentUser.OpenBookingId = data.OpenBookingId;


  }


  private closeBookingCheck() {

    let request = new CloseBookingCheckRequest();
    request.BookingId = this.currentUser.OpenBookingId;
    request.Latitude = -33.432;
    request.Longitude = 151.3452532;

    this.checkInProgress = true;
    
    let subscription = this.bookingService.CloseBookingCheckRequest(request, this.currentUser.Token)
      .subscribe(
      value => this.closeBookingCheckResponse = value,
      error => this.closeBookingCheckResponse = null,
      () => this.checkInProgress = false
    );

    //this.closeBookingCheckResponse = this.bookingService.CloseBookingCheckRequest(request, this.currentUser.Token);

  };

  

}
