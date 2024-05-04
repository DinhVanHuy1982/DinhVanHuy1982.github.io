import { Injectable } from '@angular/core';
import {environment} from "../../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContentHomePageService {

  private api = environment.API_GATEWAY_ENDPOINT;
  constructor(private http : HttpClient) { }

  getProductBestSeller(){
    return this.http.get(this.api+"product/best-seller")
  }
}
