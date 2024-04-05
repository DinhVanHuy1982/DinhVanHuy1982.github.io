import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environment/environment';
import { LocalStorageService } from './local-storage.service';
import { StorageSessionService } from './storage-session.service';
import { StompService } from '../../service/service-model/stomp.service';


const API_USERS_URL = 'api/users';
// const API_REQUEST_OTP_URL = 'user/requestOTP';
const API_REQUEST_OTP_URL = 'user/requestOTPMail';
const API_VERIFY_OTP_URL = 'user/verifyOTP';
const API_PERMISSION_URL = 'api/permissions';
const API_ROLES_URL = 'api/roles';
const REFRESH_ENDPOINT = '/api/refreshToken';
const CURRENT_NAME = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = `${environment.API_GATEWAY_ENDPOINT}`;
  private returnUrl : any;
  private urlLogout = `${environment.URL_LOGOUT}`;
  private currentUserSubject: any;
  public currentUser: any;
  public userCode:any;


  public ipClient = new BehaviorSubject<string>('');
  ipClient$ = this.ipClient.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router,
    private translate: TranslateService,
    private localStorageService: LocalStorageService,
    private stompService: StompService,
    private storageSessionService: StorageSessionService) { }

  public get currentUserValue() {
    this.currentUserSubject = new BehaviorSubject<any>(this.localStorageService.get(this.localStorageService.CURRENT_USER));
    // this.currentUser = this.currentUserSubject.asObservable();
    if (this.currentUser) {
      // localStorage.setItem('currentUser', this.currentUser);
      this.localStorageService.set(this.localStorageService.CURRENT_USER, JSON.parse(this.currentUser))
    }
    return this.currentUserSubject.value;
  }
}
