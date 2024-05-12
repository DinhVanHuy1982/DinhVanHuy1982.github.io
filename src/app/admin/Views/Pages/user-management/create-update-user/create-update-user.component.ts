import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {RolesService} from "../../role-management/roles.service";
import {OrderService} from "../../order-management/order.service";
import {UserService} from "../../../../../viewsShare/Views/user.service";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../../../environment/environment";

@Component({
  selector: 'app-create-update-user',
  templateUrl: './create-update-user.component.html',
  styleUrls: ['./create-update-user.component.scss']
})
export class CreateUpdateUserComponent {
  domaiFile = environment.DOMAIN_FILE_SERVER
  lstProvince:any= [];
  lstDistict:any= [];
  lstWard:any= [];

  errFullName=""
  errSDT="";
  errProvince="";
  errDistict="";
  errWard="";
  errUserName="";
  errPassword=""
  errRole="";
  errDescription="";

  formDataSend = new FormData();

  formCreateUpdate={
    id:null,
    username:"",
    password:"",
    email:"",
    fullName:"",
    phoneNumber:"",
    provinceId:null,
    districtId:null,
    ward:null,
    status:1,
    description:"",
    roleId:null,
    isCreate:0
  }
  itemStatus=[
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
  imgDefault=""
  fileImg:any;
  avatar :any;
  lstRoles:any=[];
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
              public dialog:MatDialog,
              private roleService:RolesService,
              private orderService:OrderService,
              private userService:UserService,
              private toast:ToastrService) {
  }
  ngOnInit(): void {
    if(this.data.isCreate){
      this.formCreateUpdate.isCreate = 1;
      this.orderService.getListProvince().subscribe((res:any)=>{
        this.lstProvince=res.data;
      })
    }else{
      this.formCreateUpdate.isCreate = 0;
      this.userService.detailUser(this.data?.itemData.id).subscribe((res:any)=>{
        this.formCreateUpdate = res.data;
        this.formCreateUpdate.isCreate=0
        if(res.data.avatar){
          this.avatar=this.domaiFile+res.data.avatar
        }
        this.searchAddress()
      })
    }
    this.roleService.getAllRole().subscribe((res:any)=>{
      this.lstRoles= res.data;
    })
  }

  create(){
    this.formDataSend.append("avatar",this.fileImg )
    this.formDataSend.append('userDto',new Blob([ JSON.stringify(this.formCreateUpdate)],{type: 'application/json'}));
    // if(this.data.isCreate){
      this.userService.createUser(this.formDataSend).subscribe((res:any)=>{
        if(res.status=='OK'){
          this.toast.success("Thành công")
          this.dialog.closeAll();
        }else{
          this.toast.error(res.message)
        }
      })
      this.formDataSend.delete("avatar")
      this.formDataSend.delete("userDto")
    // }else{
    //
    // }
  }

  detailUser(){

  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.fileImg = files[0];
    console.log("File upload: ", this.fileImg)
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = () => {
          this.avatar = reader.result as string;
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }
  changeProvince() {
    if(this.formCreateUpdate.provinceId===null){
      this.lstDistict=[]
      this.lstWard=[]
      this.formCreateUpdate.districtId=null;
      this.formCreateUpdate.ward=null;
    }else{
      const data={
        province_id:this.formCreateUpdate.provinceId
      }
      this.orderService.getListDistict(data).subscribe((res:any)=>{
        this.lstDistict=res.data;
      })
      this.lstWard=[]
      this.formCreateUpdate.districtId=null;
      this.formCreateUpdate.ward=null;
    }
  }

  changeDistict() {
    if(this.formCreateUpdate.districtId===null){
      this.lstWard=[]
      this.formCreateUpdate.ward=null;
    }else{
      this.lstWard=[]
      this.formCreateUpdate.ward=null;
      this.orderService.getListWard(this.formCreateUpdate.districtId).subscribe((res:any)=>{
        this.lstWard=res.data
      })
    }
  }
  searchAddress(){

    this.orderService.getListProvince().subscribe((res:any)=>{
      this.lstProvince=res.data
    })

    const data={
      province_id:this.formCreateUpdate.provinceId
    }
    this.orderService.getListDistict(data).subscribe((res:any)=>{
      this.lstDistict=res.data;
    })

    this.orderService.getListWard(this.formCreateUpdate.districtId).subscribe((res:any)=>{
      this.lstWard = res.data;
    })

  }
}
