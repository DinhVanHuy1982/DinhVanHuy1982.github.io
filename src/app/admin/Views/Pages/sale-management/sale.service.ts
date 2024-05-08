import { Injectable } from '@angular/core';
import {environment} from "../../../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private api = environment.API_GATEWAY_ENDPOINT
  constructor(private  http : HttpClient) {}

  getPageSale(dataSearch:any){

  }
  createSale(saleDTO:any){
    return this.http.post(this.api+"create/sale", saleDTO)
  }
  updateSale(saleDTO:any){
    return this.http.post(this.api+"update/sale", saleDTO)
  }
  searchSale(saleSearch:any){
    return this.http.post(this.api+"search/sale",saleSearch)
  }
  detailSale(code:any){
    return this.http.get(this.api+"search-detail/sale/"+code)
  }
}
