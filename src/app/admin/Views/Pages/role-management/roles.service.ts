import { Injectable } from '@angular/core';
import {environment} from "../../../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private api = environment.API_GATEWAY_ENDPOINT+"roles"
  constructor(private  http : HttpClient) {}

  public getRole(search:any){
    return this.http.post(this.api+'/getAllRoleWithPage',search);
  }
}
