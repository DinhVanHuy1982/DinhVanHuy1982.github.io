import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductService} from "../../admin/Views/Pages/product-management/product.service";

@Injectable({
  providedIn: 'root'
})
export class DetailProductService {

  API = environment.API_GATEWAY_ENDPOINT+"create/comment";
  constructor(private httpClient: HttpClient) { }

  public uploadComment(comment:any){
    return this.httpClient.post(this.API,comment);
  }

  public testAPI(){
    return this.httpClient.get(environment.API_GATEWAY_ENDPOINT+"product/testAPI")
  }
}
