import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {RolesService} from "../../role-management/roles.service";
import {OrderService} from "../../order-management/order.service";
import {UserService} from "../../../../../viewsShare/Views/user.service";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../../../environment/environment";
import {ValidateInput} from "../../../../../../core/service/model/validate-input.model";
import {CommonFunction} from "../../../../../../core/service/utils/common-function";

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
  passwordFirst="";
  rePass="";
  toggle1=false;
  toggle2=false;
  errRePasswordStr="";
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

    this.validateUser()
    if(this.data.isCreate){
      if(
        !this.errUserName.done||
        !this.errPassword.done||
        !this.errFullName.done||
        this.errRePasswordStr||
        !this.errSDT.done||
        !this.errProvince.done||
        !this.errDistict.done||
        !this.errWard.done||
        !this.errEmail.done||
        !this.errRole.done||
        this.errDescription.maxLength
      ){
        return;
      }
    }else{
      if(
        !this.errUserName.done||
        !this.errFullName.done||
        !this.errSDT.done||
        !this.errProvince.done||
        !this.errDistict.done||
        !this.errWard.done||
        !this.errEmail.done||
        !this.errRole.done||
        this.errDescription.maxLength
      ){
        return;
      }
    }


    this.formDataSend.append("avatar",this.fileImg )
    this.formCreateUpdate.password=this.passwordFirst;
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
  changeType(type:any, num:any) {
    if (type.type === 'password') {
      type.type = 'text';
    } else {
      type.type = 'password';
    }
    if(num==1){
      this.toggle1 = !this.toggle1;
    }else{
      this.toggle2 = !this.toggle2;
    }

  }

  validateUser(){
    this.validatePassWord()
    this.validateUserName()
    this.validateRepass()
    this.validateFullName()
    this.validatePhoneNumber()
    this.validateRole()
    this.validateProvince()
    this.validateDistict()
    this.validateWard()
    this.validateEmail()
    this.validateDescription()
  }

  validatePassWord() {
    this.errPassword=CommonFunction.validateInputUTF8Space(this.passwordFirst,15,/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,true, true)
  }

  validateUserName() {
    this.errUserName=CommonFunction.validateInputUTF8Space(this.formCreateUpdate.username,15,/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,true, true)
  }

  validateRepass() {
    // this.errRePassword=CommonFunction.validateInput(this.rePass,15,/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)
    if(this.rePass != this.passwordFirst){
      this.errRePasswordStr = "Không trùng khớp với mật khẩu"
    }else{
      this.errRePasswordStr = ""
    }

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
}
