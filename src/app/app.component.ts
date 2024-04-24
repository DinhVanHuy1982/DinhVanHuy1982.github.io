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
import {OwlCarousel} from 'ngx-owl-carousel';

import { CAROUSEL_OPTION, NO_ROW_GRID_TEMPLATE } from 'src/helpers/constants';
import {UserService} from "./viewsShare/Views/user.service";
import {Router, Routes} from "@angular/router";
import {DashboardComponent} from "./admin/Views/Pages/dashboard/dashboard.component";
import {RoleManagementComponent} from "./admin/Views/Pages/role-management/role-management.component";
import {HomePageComponent} from "./viewsShare/Views/home-page/home-page.component";
import {DetailProductComponent} from "./client/detail-product/detail-product.component";
import {CartComponent} from "./client/cart/cart.component";
import {ContentShopComponent} from "./viewsShare/Views/content-shop/content-shop.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  images: string[]=[];
  myCarouselOptions = {
    items: 1,
    dots: true,
    nav: true,
    autoplay: true,
    responsiveClass: true,
    loop: true,
    drag: true,
    navText: [`<svg width="32" height="32" viewBox="-1 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.168 7.05664L19.8346 16.0011L12.168 24.9455" stroke="#F26522" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,`<svg width="32" height="32" viewBox="-2 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.168 7.05664L19.8346 16.0011L12.168 24.9455" stroke="#F26522" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `],
    responsive: {
      0: this.getOptionByScreen(1),
      200: this.getOptionByScreen(1),
      405: this.getOptionByScreen(1),
    //   600: this.getOptionByScreen(3),
    //   795: this.getOptionByScreen(4),
    //   990: this.getOptionByScreen(4),
    //   992: this.getOptionByScreen(4),
    //   1187: this.getOptionByScreen(5),
    //   1382: this.getOptionByScreen(5),
    //   1577: this.getOptionByScreen(5),
    //   1772: this.getOptionByScreen(5),
    //   1967: this.getOptionByScreen(5),
    //   1846: this.getOptionByScreen(5),
    //   2162: this.getOptionByScreen(5),
    },
  };

  myCarouselOptions1 = {
    items: 1,
    dots: true,
    nav: true,
    autoplay: true,
    responsiveClass: true,
    loop: true,
    drag: true,
    navText: [`<svg width="32" height="32" viewBox="-1 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.168 7.05664L19.8346 16.0011L12.168 24.9455" stroke="#F26522" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `,`<svg width="32" height="32" viewBox="-2 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.168 7.05664L19.8346 16.0011L12.168 24.9455" stroke="#F26522" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `],
    responsive: {
      // 0: this.getOptionByScreen(1),
      // 200: this.getOptionByScreen(1),
      // 405: this.getOptionByScreen(1),
    //   600: this.getOptionByScreen(3),
      795: this.getOptionByScreen(4),
    //   990: this.getOptionByScreen(4),
    //   992: this.getOptionByScreen(4),
    //   1187: this.getOptionByScreen(5),
    //   1382: this.getOptionByScreen(5),
    //   1577: this.getOptionByScreen(5),
    //   1772: this.getOptionByScreen(5),
    //   1967: this.getOptionByScreen(5),
    //   1846: this.getOptionByScreen(5),
    //   2162: this.getOptionByScreen(5),
    },
  };

  getOptionByScreen(numberOfItems: number) {
    return {
      CAROUSEL_OPTION,
      slideBy: numberOfItems,
      items: numberOfItems,
    };
  }


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
  }

  setUserLogin(){
    this.userService.getUserCurrent().subscribe((user:any)=>{
      const checkLogin = localStorage.getItem('user');
      console.log(checkLogin)
      if(checkLogin){ // kiểm tra đã đăng nhập trước đó hay chưa
        const userLogin = JSON.parse(checkLogin)
        if(userLogin!=null){
          console.log("userLogin",userLogin)
          if(userLogin?.roles){
            this.roleManager=true;
            // this.router.resetConfig(this.routesManager);
          }else{
            this.roleManager=false;
          }
        }else{
          // this.router.resetConfig(this.routesClient);
        }
      }else {
        if(user){
          this.userLogin=user;
          localStorage.setItem('user',JSON.stringify(user))
          if(user?.roles){
            this.roleManager=true;
            // this.router.resetConfig(this.routesManager);
          }else{
            this.roleManager=false;
            // this.router.resetConfig(this.routesClient);
          }
        }else{
          localStorage.setItem('user',JSON.stringify(null))
          this.roleManager=false;
          // this.router.resetConfig(this.routesClient);
        }
      }
    })
  }

  // routesManager: Routes = [
  //   { path: 'dashboard', component: DashboardComponent },
  //   { path: 'role-management', component: RoleManagementComponent },
  //   { path: '**', component: DashboardComponent }
  // ];
  //
  // routesClient: Routes = [
  //   // {path: "dashboard", component: DashboardComponent},
  //   // {path:"role-managemment",component:RoleManagementComponent},
  //   {path: "home-page",component: HomePageComponent},
  //   {path: "details", component:DetailProductComponent},
  //   {path:"h2shop/cart",component:CartComponent},
  //   {path: "**", component: ContentShopComponent}
  // ];



  style: LineStyle = 'smooth';
  public data = [
    20, 1, 18, 3, 15, 5, 10, 6, 9, 6, 10, 5, 13, 3, 16, 1, 19, 1, 20, 2, 18, 5,
    12, 7, 10, 40,
  ];
  public data2 = [
    5, 10, 8, 15, 20, 18, 12, 10, 8, 15, 10, 6, 9, 6, 10, 5, 13, 3, 16, 1, 19,
    1, 20, 2, 18, 5,
  ];
  public seriesNames = ['Series A', 'Series B'];
  chartTooltipContent: string = '';
    title: string = '123';
  onSeriesHover(event: any) {
    // Lấy tên của chuỗi dữ liệu được trỏ vào
    const seriesName = event.category;
    // Lấy giá trị của điểm dữ liệu được trỏ vào
    const value = event.value;
    // Gán giá trị cho tooltip
    this.chartTooltipContent = `${seriesName} - ${value}`;
  }

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  public barChartLegend1 = true;
  public barChartPlugins1 = [];

  public barChartData1: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };
  public barChartType: ChartType = 'bar';
  typeChar = 'bar';

  public barChartOptions1: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };


  selectedCar: any;

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];

    columnDefs: ColDef[] = [
      { headerName: 'Make', field: 'make' },
      { headerName: 'Model', field: 'model' },
      { headerName: 'Price', field: 'price' }
    ];

    rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxster', price: 72000 }
    ];
    positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
    position = new FormControl(this.positionOptions[0]);

    openToast(){
      this.toast.success("Thành công")
    }

}
