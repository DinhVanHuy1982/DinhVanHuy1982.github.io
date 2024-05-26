import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BannerService} from "./banner.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {CAROUSEL_OPTION} from "../../../../../helpers/constants";
import {environment} from "../../../../../environment/environment";
import {OwlCarousel} from "ngx-owl-carousel";

@Component({
  selector: 'app-banner-management',
  templateUrl: './banner-management.component.html',
  styleUrls: ['./banner-management.component.scss']
})
export class BannerManagementComponent implements OnInit{
  domaiFile = environment.DOMAIN_FILE_SERVER
  formData=new FormData();
  lstImg:any[]=["https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kwU0X.img?w=730&h=468&m=6&x=377&y=77&s=76&d=186"]
  lstImgAlt:any[]=[
    "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kwU0X.img?w=730&h=468&m=6&x=377&y=77&s=76&d=186",
    "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kwU0X.img?w=730&h=468&m=6&x=377&y=77&s=76&d=186",
    "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1kwU0X.img?w=730&h=468&m=6&x=377&y=77&s=76&d=186"
  ]
  lstUrlsUpload:any[]=[]
  lstFileDto :any;
  lstIdDelete:any[]=[]
  checkDisplayBanner=false;

  constructor(private bannerService:BannerService,
              private toast:ToastrService,
              public dialog:MatDialog,
              private change:ChangeDetectorRef) {
  }
  @ViewChild('owlcarosel') owlElement?: OwlCarousel;
  ngOnInit(): void {
    this.bannerService.getLstBanner().subscribe((res:any)=>{
      if(res.status=='OK'){
        this.lstFileDto = res.data
        this.lstImg=res.data.map((item:any)=>{
          return this.domaiFile + item.fileName
        })
        this.owlElement?.refresh()
        this.checkDisplayBanner=true;
      }
      this.change.detectChanges()
    },(err:any)=>{
      this.toast.error("Mất kết nối với server")
    })
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
    },
  };
  getOptionByScreen(numberOfItems: number) {
    return {
      CAROUSEL_OPTION,
      slideBy: numberOfItems,
      items: numberOfItems,
    };
  }

  deleteFile(imgItem: any) {
    this.lstFileDto = this.lstFileDto.filter((item:any)=>{
      return item.id != imgItem.id
    })
    this.lstIdDelete.push(imgItem.id)
  }

  fileBanner :any[]=[]
  changeFile(event: any) {
    const file = event.target.file;
    this.fileBanner

  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.fileBanner = Array.from(files);
    console.log("File upload: ", this.fileBanner)
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.lstUrlsUpload.push(reader.result as string);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  deleteFileUpload(index: any) {
    this.fileBanner.splice(index,1);
  }

  openTemplateApply(template:any){
    const dialogConfig= {
      disableClose: false,
      hasBackdrop: true,
      width: '450px',
      borderRadius:'10px'
    };
    this.dialog.open(template,dialogConfig)
  }

  applyBanner() {
    console.log("File upload: ", this.fileBanner)
    console.log("Lst IdDelete", this.lstIdDelete)
    for(let i =0;i<this.fileBanner.length;i++){
      this.formData.append("banner", this.fileBanner[i])
    }
    this.formData.append("lstBannerDlete",new Blob([JSON.stringify(this.lstIdDelete)],{type: 'application/json'}))
    this.bannerService.createUpdateBanner(this.formData).subscribe((res:any)=>{
      if(res.status==='OK'){
        this.toast.success("Thành công")
        this.dialog.closeAll()
      }else{
        this.toast.warning(res.message)
      }
    },(err:any)=>{
      this.toast.error(err.message)
    })
    this.formData.delete("banner");
    this.formData.delete("lstBannerDlete");
  }
}
