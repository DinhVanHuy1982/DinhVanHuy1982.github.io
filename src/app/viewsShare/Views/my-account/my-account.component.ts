import {Component, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {environment} from "../../../../environment/environment";
import {OrderService} from "../../../admin/Views/Pages/order-management/order.service";
import {CommonFunction} from "../../../../core/service/utils/common-function";
import {ValidateInput} from "../../../../core/service/model/validate-input.model";

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit{
  domainFile = environment.DOMAIN_FILE_SERVER
  lstProvince:any= [];
  lstDistict:any= [];
  lstWard:any= [];
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
  avatar="";
  currentUser:any;
  errFullName:ValidateInput=new ValidateInput();
  errSDT:ValidateInput=new ValidateInput();
  errProvince:ValidateInput=new ValidateInput();
  errDistict:ValidateInput=new ValidateInput();
  errWard:ValidateInput=new ValidateInput();
  errEmail:ValidateInput=new ValidateInput();
  errUserName:ValidateInput=new ValidateInput();
  errPassword:ValidateInput=new ValidateInput();
  errRole:ValidateInput=new ValidateInput();
  errDescription:ValidateInput=new ValidateInput();

  constructor(private userService:UserService,
              private toast:ToastrService,
              public  dialog:MatDialog,
              private orderService:OrderService) {
    this.userService.getUserCurrent().subscribe((user:any)=>{
      if(user){
        this.currentUser = user;
      }else{
        this.toast.warning("Cần đăng nhập để thực hiện chức năng này")
      }
    })
  }
  ngOnInit(): void {
    this.searchUser()
  }
  searchUser(){
    this.userService.detailUser(this.currentUser?.id).subscribe((res:any)=>{
      this.formCreateUpdate = res.data;
      this.formCreateUpdate.isCreate=0
      if(res.data.avatar){
        this.avatar=this.domainFile+res.data.avatar
      }
      this.searchAddress()
    })
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
  fileAvatar:any
  uploadFile(event: any) {
    console.log(event)
    const files = event?.target?.files;
    const lstFile = Array.from(files);
    this.fileAvatar=lstFile[0]
    const reader = new FileReader();
    reader.onload = () => {
      this.avatar = reader.result as string;
    };
    reader.readAsDataURL(this.fileAvatar);
  }

  urlImgDefalut= './../../../'
  isEdit=false;
  getUrl() {
    return this.avatar;
  }


  validateUser(){
    this.validateFullName()
    this.validatePhoneNumber()
    this.validateProvince()
    this.validateDistict()
    this.validateWard()
    this.validateEmail()
  }

  validateUserName() {
    this.errUserName=CommonFunction.validateInputUTF8Space(this.formCreateUpdate.username,15,/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,true, true)
  }

  validateFullName() {
    this.errFullName = CommonFunction.validateInput(this.formCreateUpdate.fullName, 30,null);
  }
  validatePhoneNumber(){
    this.errSDT = CommonFunction.validateInput(this.formCreateUpdate.phoneNumber, 12,null);
  }

  validateRole() {
    this.errRole = CommonFunction.validateInput(this.formCreateUpdate.roleId, null,null);
  }

  validateProvince() {
    this.errProvince = CommonFunction.validateInput(this.formCreateUpdate.provinceId, null,null);
  }

  validateDistict() {
    this.errDistict = CommonFunction.validateInput(this.formCreateUpdate.districtId, null,null);
  }

  validateWard() {
    this.errWard = CommonFunction.validateInput(this.formCreateUpdate.ward, null,null);
  }

  validateEmail() {
    this.errEmail = CommonFunction.validateInput(this.formCreateUpdate.email, null,/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/);
  }

  validateDescription() {
    this.errRole = CommonFunction.validateInput(this.formCreateUpdate.roleId, null,null);
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
  cancel(){
    this.isEdit=false;
    this.searchUser()
  }

  changeEditOrView() {
    this.isEdit=true;
  }

  formData= new FormData();
  onUpdate() {
    this.validateUser()
    if(
        !this.errFullName.done||
        !this.errSDT.done||
        !this.errProvince.done||
        !this.errDistict.done||
        !this.errWard.done||
        !this.errEmail.done
    ){
      return;
    }

    if(this.fileAvatar){
      this.formData.append("avatar", this.fileAvatar);
    }
    this.formData.append("userDto", new Blob([ JSON.stringify(this.formCreateUpdate)],{type: 'application/json'}))
    this.userService.update(this.formData).subscribe((res:any)=>{
      if(res.status=="OK"){
        this.formCreateUpdate = res.data;
        this.formCreateUpdate.isCreate=0
        if(res.data.avatar){
          this.avatar=this.domainFile+res.data.avatar
        }
        this.isEdit=false;
        this.searchAddress()
        this.toast.success("Cập nhật thành công");
      }else{
        this.toast.error(res.message);
      }
    })
    this.fileAvatar=null;
    this.formData.delete("file")
    this.formData.delete("userDto")
    // this.isEdit=true
  }
}
