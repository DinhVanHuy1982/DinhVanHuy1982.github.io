import {Component, OnInit} from '@angular/core';
import {CAROUSEL_OPTION} from "../../../../helpers/constants";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ContentHomePageService} from "./content-home-page.service";

@Component({
  selector: 'app-content-shop',
  templateUrl: './content-shop.component.html',
  styleUrls: ['./content-shop.component.scss']
})
export class ContentShopComponent implements OnInit{

  isLogin = false;
  constructor(private toastService: ToastrService,
              private router: Router,
              private contentHomePageService: ContentHomePageService) {
  }

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

  myCarouselOptions1:any = {
    items: 5,
    dots: true,
    nav: true,
    navText: [`<svg width="32" height="32" viewBox="-1 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.168 7.05664L19.8346 16.0011L12.168 24.9455" stroke="#F26522" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `, `<svg width="32" height="32" viewBox="-2 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.168 7.05664L19.8346 16.0011L12.168 24.9455" stroke="#F26522" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `],
    autoplay: false,
    responsiveClass: true,
    loop: false,
    mouseDrag: true,
    responsive: {
      0: this.getOptionByScreen(1),
      200: this.getOptionByScreen(3),
      405: this.getOptionByScreen(3),
      600: this.getOptionByScreen(5),
      795: this.getOptionByScreen(5),
      990: this.getOptionByScreen(5),
      992: this.getOptionByScreen(5),
      1187: this.getOptionByScreen(5),
      1382: this.getOptionByScreen(5),
      1577: this.getOptionByScreen(5),
      1772: this.getOptionByScreen(5),
      1967: this.getOptionByScreen(5),
      1846: this.getOptionByScreen(5),
      2162: this.getOptionByScreen(5),
    },
  };

  images1: string[]=[];
  images: string[]=[];
  getOptionByScreen(numberOfItems: number) {
    return {
      CAROUSEL_OPTION,
      slideBy: numberOfItems,
      items: numberOfItems,
    };
  }

  addToWishList(event:any){
    if(!this.isLogin){
      this.toastService.warning("Bạn cần đăng nhập để thực hiện chức năng này")
    }
  }

  durationInSeconds: number = 30; // Độ dài của đồng hồ đếm ngược trong giây (1 giờ 30 phút)
  remainingTime: any;
  intervalId: any;
  startCountdown(): void {
    this.remainingTime = this.durationInSeconds;
    this.intervalId = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
      } else {
        this.clearInterval();
      }
    }, 1000);
  }

  clearInterval(): void {
    clearInterval(this.intervalId);
  }

  getDays(): number {
    return Math.floor(this.remainingTime / (60 * 60 * 24));
  }

  getHours(): number {
    return Math.floor((this.remainingTime % (60 * 60 * 24)) / (60 * 60));
  }

  getMinutes(): number {
    return Math.floor((this.remainingTime % (60 * 60)) / 60);
  }

  getSeconds(): number {
    return this.remainingTime % 60;
  }

  dataBestSeller:any;
  ngOnInit(): void {
    this.contentHomePageService.getProductBestSeller().subscribe((data:any)=>{
      this.dataBestSeller = data.data;
    })
    this.startCountdown();
  }

  goToDetailsProduct(){
    this.router.navigate(["/details"],{})
  }
}
