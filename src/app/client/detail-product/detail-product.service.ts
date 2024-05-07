import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ProductService} from "../../admin/Views/Pages/product-management/product.service";

@Injectable({
  providedIn: 'root'
})
export class DetailProductService {

  API = environment.API_GATEWAY_ENDPOINT+"product/comment";
  constructor(private httpClient: HttpClient) { }

  public uploadComment(files:FileList){
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
    }
    return this.httpClient.post(this.API,formData);
  }

  public testAPI(){
    return this.httpClient.get(environment.API_GATEWAY_ENDPOINT+"product/testAPI")
  }
}
