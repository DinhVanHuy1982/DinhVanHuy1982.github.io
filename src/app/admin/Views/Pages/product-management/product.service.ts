import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = environment.API_GATEWAY_ENDPOINT+"product";
  constructor(private http:HttpClient) { }

  public getProduct(dataSearch: any){
    return this.http.post(this.api+"/get-page-product", dataSearch);
  }

  public saveProduct(data:any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return  this.http.post(this.api+"/createProduct", data, {headers})
  }

  public updateProduct(data:any){
    // const headers = new HttpHeaders();
    // headers.append('Content-Type', 'multipart/form-data');{headers}
    return  this.http.post(this.api+"/updateProduct", data, )
  }


  public getDetailProduct(productId:any){
    return this.http.get(this.api+"/get-detail/"+productId);
  }
  public getDetailProductForClient(productId:any){
    return this.http.get(this.api+"/get-detail-for-client/"+productId);
  }
  public getAllProductForCreateSale(){
    return this.http.get(this.api+'/getAll');
  }
  public searchProduct(dataSearch:any){// api phục vụ lấy dữ liệu hiển thị cho việc tìm kiếm sản phẩm cho người dùng
    return this.http.post(this.api+'/search-by-client', dataSearch)
  }
}
