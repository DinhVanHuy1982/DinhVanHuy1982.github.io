import { Component } from '@angular/core';
import {BreadcrumbService} from "../../../../core/_base/layout/service/breadcrumb.service";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  constructor(private breadService: BreadcrumbService){

  }
  receivedData: any;

  ngOnInit(): void {
    // console.log(this.breadcrumbs);
    this.breadService.getBreadcrumb().subscribe( (data:any) => {
      this.receivedData = data;
      console.log("Breadcrum recei: ", data);
    });
  }
  routerLink(arg0: string) {
    // console.log('RouterLink');

  }
  checkRouter(t25: any, i : number)  {
    // console.log('CheckRouter', t25);
    if(i == (this.receivedData.length-1)){
      return 'link-end';
    }else{
      return 'breadcum';
    }
  }
  canBack= false;
  notShowBreadcrumb: any;
  hide: any;
  isParentUser: any;
  notRouter: any;
  back() {
    // console.log('Back');

  }


  // breadcrumbs: Breadcrumb[] = [
  //   {
  //     title: 'Home page',
  //     page: 'tt',
  //     translate: 'MENU.PARENTS.HOME'
  //   },
  //   {
  //     title: 'Details',
  //     page: 'DT',
  //     translate: 'PARENTS.DETAIL'
  //   },
  //
  // ];
}
