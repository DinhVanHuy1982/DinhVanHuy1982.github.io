import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private api = environment.API_GATEWAY_ENDPOINT+"cart/";
  constructor(private http:HttpClient) { }

  getAllCart(id:any){
      return this.http.get(this.api+"get-cart-by-user/"+id)
  }
  createCart(data: any) {
    return this.http.post(this.api + "create/cart", data)
  }

  deleteCart(cartId:number) {
    return this.http.get(this.api+"delete-cart/"+cartId)
  }
}
