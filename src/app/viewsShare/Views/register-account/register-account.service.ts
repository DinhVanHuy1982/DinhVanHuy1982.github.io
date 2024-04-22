import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class RegisterAccountService {

  api = environment.API_GATEWAY_ENDPOINT+'user';

  constructor(private http: HttpClient) { }

  public registerAccountClient(form:any){
    return this.http.post(this.api+'/createUserClient',form);
  }
}
