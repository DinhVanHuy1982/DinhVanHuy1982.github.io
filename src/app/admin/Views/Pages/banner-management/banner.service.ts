import { Injectable } from '@angular/core';
import {environment} from "../../../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private api = environment.API_GATEWAY_ENDPOINT+"banner"

  constructor(private http:HttpClient) { }

  public getLstBanner(){
    return this.http.get(this.api+"/get-list-banner");
  }

  public createUpdateBanner(form:any){
    return this.http.post(this.api+"/create-banner", form);
  }
}
