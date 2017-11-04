import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Constants from '../providerConstants';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/observable';

import {TemplateUpdateRequest} from './template-update-request';
import {TemplateUpdateResponse} from './template-update-response';
import {Template} from './template';
import {TemplateField} from './template-field';

let apiUrl = Constants.API_ENDPOINT

@Injectable()
export class AdminServiceProvider {

  constructor(public http: Http) {
    console.log('Hello AdminServiceProvider Provider');
  }

  getTemplateFields(token: string) : Observable<TemplateField[]> {
    console.log('AdminService: getTemplateFields(${request})');

        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + token);

        return this.http.get(
            apiUrl +'api/admin/gettemplatefields', 
            {headers:headers})
        .map(response=> response.json());
  }

  getTemplate(token: string) : Observable<Template> {
    console.log('AdminService: getTemplate(${request})');

        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + token);

        return this.http.get(
            apiUrl +'api/admin/gettemplate', 
            {headers:headers})
        .map(response=> response.json());
  }

  updateTemplate(request: TemplateUpdateRequest, token: string) : Observable<TemplateUpdateResponse> {
    console.log('AdminService: updateTemplate(${request})');

        let headers: Headers = new Headers();
        headers.append('accept','application/json');
        headers.append('content-Type', 'application/json');
        headers.append('authorization','Bearer ' + token);

        return this.http.post(
            apiUrl +'api/admin/updatetemplate', 
            request, 
            {headers:headers})
        .map(response=> response.json());
  }
}
