import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {BrandService} from "../brand.service";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../../../environment/environment";
import {BrandManagementComponent} from "../brand-management.component";

@Component({
  selector: 'app-create-update-brand',
  templateUrl: './create-update-brand.component.html',
  styleUrls: ['./create-update-brand.component.scss']
})
export class CreateUpdateBrandComponent implements OnInit{
  domainFile= environment.DOMAIN_FILE_SERVER;
  formDataSend= new FormData();
  avatarBrand:any;
  formCreateUpdate={
    id:null,
    brandCode:"",
    brandName:"",
    address:"",
    description:"",
    phoneNumber:"",
    email:"",
    status:1,
    avatar:""
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              public dialog:MatDialog,
              private brandService: BrandService,
              private toast:ToastrService,
  ) {
  }
  ngOnInit(): void {
    if(!this.data.isCreate){
      this.brandService.detailBrand(this.data.itemData.id).subscribe((res:any)=>{
        if(res.status==="OK"){
          this.formCreateUpdate = res.data;
          if(this.formCreateUpdate.avatar){
            this.formCreateUpdate.avatar = this.domainFile+ this.formCreateUpdate.avatar;
          }
        }else{
          this.toast.error("Có lỗi trong quá trình xử lý")
        }
      })
    }
  }

  itemActive=[
    {
      name: "Hoạt động",
      code: 1,
      color: "green"
    },
    {
      name: "Không hoạt động",
      code:0,
      color: "red",
    }
  ];

  create(){
    if(this.avatarBrand){
      this.formDataSend.append("avatar",this.avatarBrand)
    }
    this.formCreateUpdate.avatar="";
    this.formDataSend.append("brand", new Blob([JSON.stringify(this.formCreateUpdate)],{type: 'application/json'}));
    this.brandService.createBrand(this.formDataSend).subscribe((res:any)=>{
      if(res.status==='OK'){
        this.toast.success("Tạo mới thành công")
        this.dialog.closeAll();
      }else{
        this.toast.error(res.message)
      }
    });
  }
  update(){
    if(this.avatarBrand){
      this.formDataSend.append("avatar",this.avatarBrand)
    }
    this.formCreateUpdate.avatar="";
    this.formDataSend.append("brand", new Blob([JSON.stringify(this.formCreateUpdate)],{type: 'application/json'}));
    this.brandService.updateBrand(this.formDataSend).subscribe((res:any)=>{
      if(res.status==='OK'){
        this.toast.success("Cập nhật thành công")
        this.dialog.closeAll();
      }else{
        this.toast.error(res.message)
      }
    });
  }
  onFileSelected(event: any){
    const files = event.target.files;
    const filesArray: File[] = Array.from(files);
    if(filesArray.length>1){
      // chỉ cho chọn 1 file ảnh đại diện
    }else{
      this.avatarBrand = files[0];
      console.log("File upload: ", this.avatarBrand)
      if (files) {
        for (let i = 0; i < files.length; i++) {
          const reader = new FileReader();
          reader.onload = () => {
            this.formCreateUpdate.avatar = reader.result as string;
          };
          reader.readAsDataURL(files[i]);
        }
      }
    }

  }
  removeImgProduct(){
    this.formCreateUpdate.avatar="";
  }
}
