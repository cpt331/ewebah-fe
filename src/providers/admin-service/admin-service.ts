//======================================
//
//Name: admin-service.ts
//Version: 1.0
//Date: 03/12/2017
//Developer: Chris Espie
//Contributor: Drew Gamble, Steven Innes, Shawn Burriss
//
//======================================

//ionic
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Constants from '../providerConstants';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';

//custom
import {TemplateUpdateRequest} from './template-update-request';
import {TemplateUpdateResponse} from './template-update-response';
import {Template} from './template';
import {TemplateField} from './template-field';

let apiUrl = Constants.API_ENDPOINT

//this provider handles administration functions for the system 
@Injectable()
export class AdminServiceProvider {

  constructor(public http: Http) {
  }

  //return a list of available template fields that can be used when
  //creating an email template
  getTemplateFields(token: string) : Observable<TemplateField[]> {
    
    //pass in the current authenticated token via headers
    let headers: Headers = new Headers();
    headers.append('accept','application/json');
    headers.append('content-Type', 'application/json');
    headers.append('authorization','Bearer ' + token);

    //send http get request with data and trigger observable
    return this.http.get(
        apiUrl +'api/admin/gettemplatefields', 
        {headers:headers})
    .map(response=> response.json());
  }

  //return the current email template used for new registration emails
  getTemplate(token: string) : Observable<Template> {
    
    //pass in the current authenticated token via headers
    let headers: Headers = new Headers();
    headers.append('accept','application/json');
    headers.append('content-Type', 'application/json');
    headers.append('authorization','Bearer ' + token);

    //send http get request with data and trigger observable
    return this.http.get(
        apiUrl +'api/admin/gettemplate', 
        {headers:headers})
    .map(response=> response.json());
  }

  //update the email template used for new registration emails
  updateTemplate(request: TemplateUpdateRequest, token: string) 
  : Observable<TemplateUpdateResponse> {

    //pass in the current authenticated token via headers
    let headers: Headers = new Headers();
    headers.append('accept','application/json');
    headers.append('content-Type', 'application/json');
    headers.append('authorization','Bearer ' + token);

    //send http post request with data and trigger observable
    return this.http.post(
        apiUrl +'api/admin/updatetemplate', 
        request, 
        {headers:headers})
    .map(response=> response.json());
  }
}
