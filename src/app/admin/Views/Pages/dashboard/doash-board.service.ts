import { Injectable } from '@angular/core';
import {environment} from "../../../../../environment/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoashBoardService {
  private api =  environment.API_GATEWAY_ENDPOINT+'doashboard'


  constructor(private http:HttpClient) { }

  public getDataForDiagram(year:number){
    return this.http.get(this.api+"/get-data-for-diagram/"+year)
  }
}
