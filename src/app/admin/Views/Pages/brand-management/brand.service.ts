import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private api = environment.API_GATEWAY_ENDPOINT+"brand";
  constructor(private http: HttpClient) { }
  public getPageBrand(dataSearch:any){
    return this.http.post(this.api+"/getPageBrand",dataSearch)
  }

  public getListBrand(){
    return this.http.get(this.api+"/getListBrand");
  }

  public detailBrand(id:any){
    return this.http.get(this.api+"/detail-brand/"+id);
  }

  public createBrand(formData: any){
    return this.http.post(this.api+'/createBrand', formData);
  }
  public updateBrand(formData: any){
    return this.http.post(this.api+'/updateBrand', formData);
  }

  deleteBrand(id:any) {
    return this.http.get(this.api+"/delete-brand/"+id);
  }
}
