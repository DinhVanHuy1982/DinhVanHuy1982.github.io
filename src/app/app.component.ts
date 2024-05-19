import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { LineStyle, SeriesHoverEvent } from '@progress/kendo-angular-charts';
import { ColDef } from 'ag-grid-community';
import { ChartConfiguration } from 'chart.js';
import { ChartType } from 'chart.js/auto';
import { ToastrService } from 'ngx-toastr';

import {locale as vnLang} from '../core/_config/i18n/vn';
import {locale as enLang} from '../core/_config/i18n/en';
import { TranslationService } from 'src/core/_base/layout/service/translation.service';

import { CAROUSEL_OPTION } from 'src/helpers/constants';
import {UserService} from "./viewsShare/Views/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{



  userLogin=null;
  roleManager=false;
  constructor(private dialog: MatDialog,private toast: ToastrService,
              private userService:UserService,
              private translationService: TranslationService,
              private router: Router){
    this.translationService.loadTranslations(enLang, vnLang);
  }
  ngOnInit(): void {
    console.log('da vaoooooooooooo-----------')
    sessionStorage.setItem('routingStack', JSON.stringify([]));
    this.setUserLogin()
    this.navigateUser()
  }

  setUserLogin(){
    const checkLogin = localStorage.getItem('user');
    if(checkLogin){ // đã đăng nhập
      const userLogin = JSON.parse(checkLogin)
      this.userService.setUserCurrent(userLogin)
      if(userLogin?.roles){
        this.roleManager=true;
        this.router.navigateByUrl('/dashboard')
      }else{
        this.roleManager=false;
      }
    }else{
      this.userService.setUserCurrent(null);
      this.roleManager=false;
    }
  }

  navigateUser(){
    this.userService.getUserCurrent().subscribe((user:any)=>{
      if(user){
        if(user.roles){
          this.roleManager=true;
          this.router.navigateByUrl('/dashboard')
        }else{
          this.roleManager=false;
        }
      }else{
        this.router.navigateByUrl('home-page-content')
        this.roleManager=false;
      }


    //   const checkLogin = localStorage.getItem('user');
    //   console.log(checkLogin)
    //   if(checkLogin){ // kiểm tra đã đăng nhập trước đó hay chưa
    //     const userLogin = JSON.parse(checkLogin)
    //     if(userLogin!=null){
    //       console.log("userLogin",userLogin)
    //       if(userLogin?.roles){
    //         this.roleManager=true;
    //         this.router.navigateByUrl('/dashboard')
    //       }else{
    //         this.roleManager=false;
    //       }
    //     }else{
    //     }
    //   }else {
    //     if(user){
    //       this.userLogin=user;
    //       localStorage.setItem('user',JSON.stringify(user))
    //       if(user?.roles){
    //         this.roleManager=true;
    //         this.router.navigateByUrl('/dashboard')
    //       }else{
    //         this.roleManager=false;
    //       }
    //     }else{
    //       localStorage.setItem('user',JSON.stringify(null))
    //       this.roleManager=false;
    //     }
    //   }
    })
  }
}
