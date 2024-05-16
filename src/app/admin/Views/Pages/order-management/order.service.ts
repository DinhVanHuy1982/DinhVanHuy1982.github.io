import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private api = environment.API_GATEWAY_ENDPOINT

  private apiprovince="https://online-gateway.ghn.vn/shiip/public-api"
  private token="faa08a2d-075e-11ef-99f3-d6c2df26db63"
  private apiGetPayMentOnline = environment.API_GATEWAY_PAYMENT_ONLINE;

  constructor(private http:HttpClient) { }

  getListProvince(){
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(this.apiprovince+'/master-data/province',{headers})
  }

  getListDistict(provinceId:any){
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(this.apiprovince+'/master-data/district',provinceId,{headers})
  }

  getListWard(distictId:any){
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.get(this.apiprovince+'/v2/master-data/wards?district_id='+distictId,{headers})


  }

  getListShippingUnit(data:any){
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(this.apiprovince+'/v2/shipping-order/available-services',data,{headers})
  }
  caculateFee(data:any){
    const headers = new HttpHeaders().set('token', this.token);
    return this.http.post(this.apiprovince+'/v2/shipping-order/fee',data,{headers})
  }

  searchSaleForBill(){
    return this.http.get(this.api+'search/sale-bill')
  }
  createOrder(data:any){
    return this.http.post(this.api+'create/Order', data)
  }
  updateOrder(data:any){
    return this.http.post(this.api+'update/order', data)
  }

  searchOrder(data: any){
    return this.http.post(this.api+'order/search', data);
  }
  detailOrder(orderId:number){
    return this.http.get(this.api+'order/detail/'+orderId)
  }

  getLinkPayMent(amount:number){
    return this.http.get(this.apiGetPayMentOnline+amount)
  }
}
