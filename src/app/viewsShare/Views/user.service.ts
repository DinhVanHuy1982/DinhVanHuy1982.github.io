import { Injectable } from '@angular/core';
import {environment} from "../../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userCurrent = new BehaviorSubject<any>([]);
  private api = environment.API_GATEWAY_ENDPOINT+'user';
  constructor(private http: HttpClient) { }

  public registerAccountClient(form:any){
    return this.http.post(this.api+'/createUserClient',form);
  }
  public userLogin(user:any){
    return this.http.post(this.api+'/login',user);
  }

  setUserCurrent(data: any) {
    localStorage.removeItem('user')
    this.userCurrent.next(data);
  }

  getUserCurrent() {
    return this.userCurrent.asObservable();
  }
}
