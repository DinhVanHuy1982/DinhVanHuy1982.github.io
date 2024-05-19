import { Injectable } from '@angular/core';
import {environment} from "../../../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ImportProductService {

  private api = environment.API_GATEWAY_ENDPOINT+"import";
  constructor(private http:HttpClient) { }

  importProduct(data:any){
    return this.http.post(this.api+"/product",data);
  }
}
