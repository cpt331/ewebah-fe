//ionic
import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

//custom
import { AdminServiceProvider } from '../../providers/admin-service/admin-service';
import { TemplateUpdateRequest } from '../../providers/admin-service/template-update-request';
import { TemplateUpdateResponse } from '../../providers/admin-service/template-update-response';
import { Template } from '../../providers/admin-service/template';
import { TemplateField } from '../../providers/admin-service/template-field';
import { AdminHomePage } from '../admin-home/admin-home';

@IonicPage()
@Component({
  selector: 'page-admin-email-template',
  templateUrl: 'admin-email-template.html',
})

//this page allows administration of the email template used when sending
//out emails to newly registered users
export class AdminEmailTemplatePage {

  private templateForm : FormGroup;
  private formSubmitting : boolean = false;
  private templateLoading : boolean = true;
  private updateRequest : TemplateUpdateRequest = new TemplateUpdateRequest();
  private updateResponse : TemplateUpdateResponse = null;
  currentUser = { access_token: "", 
                  Name: "",
                  Email: "",
                  Id: "", 
                  token_type:"",
                  HasOpenBooking: false, 
                  OpenBookingId:-1};
  private updateTemplateResponse : TemplateUpdateRequest = null;
  private templateFieldsLoading : boolean = true;
  private templateFields : TemplateField[] = null;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public adminService: AdminServiceProvider,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController) {

      //setup a form with validation logic
      this.templateForm = this.formBuilder.group({
        Subject: [this.updateRequest.Subject, Validators.required],
        Title: [this.updateRequest.Title, Validators.required],
        Body: [this.updateRequest.Body, Validators.required],
        Footer: [this.updateRequest.Footer, Validators.required]
      });

  }

  //load the current template and available template fields
  ionViewDidLoad() {
    this.loadUserData();
    this.loadTemplate();
    this.loadTemplateFields();
  }

  //load the current template from the back end API
  loadTemplate()  {
    //send a request to the backend API and listen for the response
    let subscription = this.adminService.getTemplate(
      this.currentUser.access_token)
      .subscribe(
      value => {
        this.updateRequest.Subject = value.Subject,
        this.updateRequest.Title = value.Title,
        this.updateRequest.Body = value.Body,
        this.updateRequest.Footer = value.Footer
      },
      error => {},
      () => this.templateLoading = false
    );
  }

  //load the current template fields from the back end API
  loadTemplateFields()  {
    //send a request and listen for a response
    let subscription = this.adminService.getTemplateFields(
      this.currentUser.access_token)
      .subscribe(
      value => {
        this.templateFields = value;
      },
      error => this.templateFields = null,
      () => this.templateFieldsLoading = false
    );
  }

  //load the current user data from local storage
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

  //send the form data to the back end to update the template
  submitForm(){
    
    //set state of the form to submitting which updates the UI view
    this.formSubmitting = true;

    //send an update request to the API and listen for response
    let subscription = this.adminService.updateTemplate(
      this.updateRequest, 
      this.currentUser.access_token)
          .subscribe(
          value => {
            this.processResponse(value);
          },
          error => {
            this.updateResponse = null;
            const alert = this.alertCtrl.create({
              title: "Something went wrong!",
              buttons: [{
                text: 'Ok'
              }]
            });
            alert.present();
            this.formSubmitting = false;
          },
          () => this.formSubmitting = false
        );
  }

  //handle the response to an update request
  processResponse(response){
    this.updateResponse = response;
    //send ionic alert to the user letting them know the status
    const alert = this.alertCtrl.create({
      title: response.Message,
      buttons: [{
        text: 'Ok',
        handler: () => {
          if(response.Success){
            this.navCtrl.push(AdminHomePage, {}, {animate: true});
          }
        }
      }]
    });
    alert.present();
  }
}
