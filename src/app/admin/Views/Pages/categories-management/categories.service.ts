import { Injectable } from '@angular/core';
import {environment} from "../../../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private api = environment.API_GATEWAY_ENDPOINT+"categories";
  constructor(private http:HttpClient) { }
  public apiGetDataTree(){
    return this.http.get(this.api+"/getCategories")
  }
}
