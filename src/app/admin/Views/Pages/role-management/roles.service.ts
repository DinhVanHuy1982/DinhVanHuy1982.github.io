import { Injectable } from '@angular/core';
import {environment} from "../../../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private api = environment.API_GATEWAY_ENDPOINT
  constructor(private  http : HttpClient) {}

  public getRole(search:any){
    return this.http.post(this.api+'roles/getAllRoleWithPage',search);
  }

  public getListFunctionCreate(){
    return this.http.get(this.api+"function/get-function-detail");
  }
  public createRole(data: any){
    return this.http.post(this.api+"roles/createRole", data)
  }

  public getDetailRole(id:any){
    return this.http.get(this.api+"roles/get-detail-role-byId/"+id);
  }
  public updateRole(formUpdate: any){
    return this.http.post(this.api+"roles/update-role", formUpdate);
  }
  public deleteRole(id:any){
    return this.http.get(this.api+"roles/delete-role/"+id)
  }
}
