import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
//import {DatePicker} from '@ionic-native/date-picker';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ReturnPage } from '../pages/return/return';
import { AutocompletePage } from '../pages/home/autocompletepage';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { PaymentInfoPage } from '../pages/paymentinfo/paymentinfo';
import { ForgotPasswordPage } from "../pages/forgotpass/forgotpass";
import { otpPage} from '../pages/otp/otp';
import { TransactionHistoryPage} from '../pages/transaction-history/transaction-history';
import { AdminHomePage} from '../pages/admin-home/admin-home';
import { AdminCarsPage } from '../pages/admin-cars/admin-cars';
import { AdminCarPage} from '../pages/admin-car/admin-car';
import { AdminEmailTemplatePage} from '../pages/admin-email-template/admin-email-template';
import {PersonalDetailsPage} from '../pages/personal-details/personal-details';

import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { CarServiceProvider } from '../providers/car-service/car-service';
import { BookingServiceProvider } from '../providers/booking-service/booking-service';
import { ReturnServiceProvider } from '../providers/return-service/return-service';
import { TransactionHistoryServiceProvider } from '../providers/transaction-history-service/transaction-history-service';
import { AdminServiceProvider } from '../providers/admin-service/admin-service';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SettingsPage,
    SignupPage,
    ReturnPage,
    PaymentInfoPage,
    AutocompletePage,
    ForgotPasswordPage,
	otpPage,
    TransactionHistoryPage,
    AutocompletePage,
    AdminHomePage,
    AdminCarPage,
    AdminCarsPage,
    AdminEmailTemplatePage,
    PersonalDetailsPage
  ],
  imports: [
    BrowserModule, HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SettingsPage,
    ReturnPage,
    SignupPage,
    PaymentInfoPage,
    AutocompletePage,
    ForgotPasswordPage,
	otpPage,
    TransactionHistoryPage,
    AutocompletePage,
    AdminHomePage,
    AdminCarPage,
    AdminCarsPage,
    AdminEmailTemplatePage,
    PersonalDetailsPage
  ],
  providers: [
    StatusBar,
    //DatePicker,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Geolocation,
    {provide:ErrorHandler,useClass:IonicErrorHandler},
    CarServiceProvider,
    BookingServiceProvider,
    ReturnServiceProvider,
    TransactionHistoryServiceProvider,
    AdminServiceProvider
  ]
})
export class AppModule {}
