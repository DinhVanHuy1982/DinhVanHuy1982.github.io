import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiprovince="https://online-gateway.ghn.vn/shiip/public-api"
  private token="faa08a2d-075e-11ef-99f3-d6c2df26db63"

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
}
