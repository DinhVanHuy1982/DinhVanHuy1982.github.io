import { Injectable } from '@angular/core';
import {environment} from "../../../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private api = environment.API_GATEWAY_ENDPOINT+"categories";
  constructor(private http:HttpClient) { }
  public apiGetDataTree(search:any){
    return this.http.post(this.api+"/getCategories",search)
  }
  public getNoTree(){
    return this.http.get(this.api+"/get-categories-no-tree")
  }

  public updateCategories(categories:any){
    return this.http.post(this.api+"/update-categories", categories)
  }
  public createCategories(categories:any){
    return this.http.post(this.api+"/createCategories", categories)
  }

  public getById(id:any){
    return this.http.get(this.api+"/get-by-id/"+ id)
  }

  deleteCategories(idCategories:number) {
    return this.http.get(this.api+"/delete-by-id/"+idCategories)
  }
}
