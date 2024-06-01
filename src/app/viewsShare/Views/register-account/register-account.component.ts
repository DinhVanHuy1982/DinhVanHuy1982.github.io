import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialogRef} from "@angular/material/dialog";
import {RegisterAccountService} from "./register-account.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../user.service";
import {OrderService} from "../../../admin/Views/Pages/order-management/order.service";

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.scss']
})
export class RegisterAccountComponent implements OnInit{

  fileAvatar!:File;
  messErrFileAvatar='';
  messErrUserName='';
  messErrPassword='';
  messErrRePassword='';
  messErrFullName='';
  messErrEmail='';
  messErrSDT="";
  messErrProvince="";
  messErrDistict="";
  messErrWard="";
  lstProvince= [];
  lstDistict= [];
  lstWard= [];
  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<RegisterAccountComponent>,
              private userService: UserService,
              private toastService: ToastrService,
              private orderService:OrderService,) {
  }
  formRegis!:FormGroup;
  formDataAvatar=new FormData();
  formDataSent = new FormData();
  toggle1=false;
  toggle2=false;
  ngOnInit(): void {
    this.orderService.getListProvince().subscribe((res:any)=>{
      this.lstProvince=res.data;
    })
    this.buildForm();
  }
  buildForm(){
    this.formRegis= this.fb.group({
      username:new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.minLength(6)]),
      address: new FormControl(),
      provinceId: new FormControl(null, [Validators.required]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.maxLength(12)]),
      districtId: new FormControl(null, [Validators.required]),
      ward: new FormControl(null, [Validators.required]),
      fullName:new FormControl(null,[Validators.required, Validators.maxLength(30)]),
      password: new FormControl(null, [Validators.required, Validators.maxLength(16), Validators.minLength(6)]),
      rePassword: new FormControl(),
      email: new FormControl(null , [Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/)]),
    })
  }
  uploadFile(event:any){
    const reader = new FileReader(); // HTML5 FileReader API
    const file = this.fileAvatar = event.target.files[0];
    const ext = file.name.match(/\.([^\.]+)$/)[1];
    const extList = ['jpg','jpeg','png','bmp','tif','tiff','PNG','JPG'];

    if(extList.includes(ext)){
      reader.readAsDataURL(file);

      this.fileAvatar = file;
      const formData = new FormData();
      formData.append('file',this.fileAvatar);
      console.log("File logo: ",formData.get('file'));
      this.formDataAvatar=formData;
      console.log("FormData: ", this.formDataAvatar)
    }else{
      this.messErrFileAvatar = "File ảnh không đúng định dạng";
    }
  }

  validatorPassWord(){
    // valid pass
    // if(this.formRegis.get('password')?.value != null){
      const regexUserName = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
      const regexSpaceBetween = /^\s*\S+\s*$/;
      const space = /^\s*$/;

      if(!regexSpaceBetween.test(this.formRegis.get('password')?.value)){
        this.messErrPassword = 'Mẩt khẩu không được chứa khoảng trắng';
      }else if( this.formRegis.get('password')?.errors?.['maxlength']){
        this.messErrPassword = 'Mẩt khẩu nhập không được vượt quá 16 kí tự';
      }else if(space.test(this.formRegis.get('password')?.value) || this.formRegis.get('name')?.errors?.['required']){
        this.messErrPassword = 'Mẩt khẩu không không thể là kí tự trắng';
      }else if(!regexUserName.test(this.formRegis.get('password')?.value)){
        this.messErrPassword = 'Mẩt khẩu chứa ít nhất 1 kí tự in hoa, số, đặc biệt';
      }else{
        this.messErrPassword ='';
      }
    // }
  }
  validatorUserName(){
    if(this.formRegis.get('username')?.value != null){
      const regexUserName = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;
      const regexSpaceBetween = /^\s*\S+\s*$/;
      const space = /^\s*$/;

      if(!regexSpaceBetween.test(this.formRegis.get('username')?.value)){
        this.messErrUserName = 'Tên đăng nhập không được chứa khoảng trắng';
      }else if(this.formRegis.get('username')?.errors?.['maxlength']){
        this.messErrUserName = 'Tên đăng nhập không được vượt quá 15 kí tự';
      }else if(space.test(this.formRegis.get('username')?.value)){
        this.messErrUserName = 'Tên đăng nhập không không thể là kí tự trắng';
      }else if(!regexUserName.test(this.formRegis.get('username')?.value)){
        this.messErrUserName = 'Tên đăng nhập chứa ít nhất 1 kí tự in hoa, số, đặc biệt';
      }else{
        this.messErrUserName='';
      }
    }else{
      this.messErrUserName = 'Tên đăng nhập không được để trống';
    }
  }
  validatorFullName(){
    if(this.formRegis.get('fullName')?.errors?.['maxlength']){
      this.messErrFullName='Họ và tên không được quá 30 kí tự';
    }else if(this.formRegis.get('fullName')?.errors?.['required']){
      this.messErrFullName='Họ và tên không được để trống';
    }else{
      this.messErrFullName='';
    }
  }
  validatorEmail(){
    if(this.formRegis.get('email')?.errors?.['pattern']){
      this.messErrEmail='Email không đúng định dạng';
    }else if(this.formRegis.get('email')?.errors?.['required']){
      this.messErrEmail='Email không được để trống';
    }else{
      this.messErrEmail='';
    }
  }
  validatorRePass(){
    if(this.formRegis.get('rePassword')?.errors?.['required']){
      this.messErrRePassword='Không được để trống';
    }else{
      const rePass = this.formRegis.get('rePassword')?.value;
      const pass = this.formRegis.get('password')?.value;
      if(pass != '' && pass != null){
        if(rePass != pass){
         this.messErrRePassword='Nhập lại mật khẩu phải giống mật khẩu trước đó';
        }else{
          this.messErrRePassword='';
        }
      }else {
        this.messErrRePassword='';
      }
    }
  }
  register(){
    this.validatorEmail();
    this.validatorUserName()
    this.validatorFullName();
    this.validatorPassWord();
    this.validatorRePass();
    // this.changeProvince();
    // this.changeDistict();
    // this.validateWard();
    this.validateAddressUser()
    this.validateSDT()
    if(!this.messErrUserName &&
      !this.messErrEmail &&
      !this.messErrRePassword &&
      !this.messErrFullName &&
      !this.messErrFileAvatar &&
    !this.messErrWard &&
    !this.messErrProvince &&
    !this.messErrDistict &&
    !this.messErrSDT){
      console.log("Avatar: ", this.formDataAvatar)
      this.formDataSent = new FormData();
      if(this.fileAvatar){
        this.formDataSent.append("avatar", this.fileAvatar)
      }

      this.formDataSent.append('userDto', new Blob([JSON.stringify(this.formRegis.value)],{type:'application/json'}))

      this.userService.registerAccountClient(this.formDataSent).subscribe((data:any)=>{
        if(data?.status === 'OK'){
          this.toastService.success('Đăng kí tài khoản thành công');
          this.dialogRef.close();
        }else{
          this.toastService.error(data.message);
        }
      })
    }
  }

  close(){
    this.dialogRef.close();
  }

  changeType(type:any, number: number) {
    if (type.type === 'password') {
      type.type = 'text';
    } else {
      type.type = 'password';
    }
    if(number==1){
      this.toggle1 = !this.toggle1;
    }else{
      this.toggle2 = !this.toggle2;
    }
  }

  validateAddressUser(){
    if(this.formRegis.get("provinceId")?.value==null){
      this.messErrProvince="Tỉnh không được để trống"
    }else{
      this.messErrProvince=""
    }
    if(this.formRegis.get("districtId")?.value==null){
      this.messErrDistict="Quận, huyện không được để trống"
    }else{
      this.messErrDistict=""
    }
    if(this.formRegis.get("ward")?.value==null){
      this.messErrWard="Xã, phường không được để trống"
    }else{
      this.messErrWard=""
    }
  }

  changeProvince() {
    if(this.formRegis.get("provinceId")?.value===null){
      this.lstDistict=[]
      this.lstWard=[]
      this.messErrProvince="Tỉnh không được để trống"
      this.formRegis.get("districtId")?.setValue(null);
      this.formRegis.get("ward")?.setValue(null);
    }else{
      const data={
        province_id:this.formRegis.get("provinceId")?.value
      }
      this.orderService.getListDistict(data).subscribe((res:any)=>{
        this.lstDistict=res.data;
      })
      this.messErrProvince=""
      this.lstWard=[]
      this.formRegis.get("districtId")?.setValue(null);
      this.formRegis.get("ward")?.setValue(null);
    }
  }

  changeDistict() {
    if(this.formRegis.get("districtId")?.value===null){
      this.lstWard=[]
      this.formRegis.get("ward")?.setValue(null)
      this.messErrDistict="Quận, huyện không được để trống"
    }else{
      this.messErrDistict=""
      this.lstWard=[]
      this.formRegis.get("ward")?.setValue(null)
      this.orderService.getListWard(this.formRegis.get("districtId")?.value).subscribe((res:any)=>{
        this.lstWard=res.data
      })
    }
  }

  validateSDT() {
    if(this.formRegis.get('phoneNumber')?.errors?.['maxlength']){
      this.messErrSDT = 'Số điện thoại không được vượt quá 12 kí tự';
    }else if(this.formRegis.get('phoneNumber')?.errors?.['required']){
      this.messErrSDT = 'Số điện thoại không được để trống';
    }else{
      this.messErrSDT =""
    }
  }

  validateWard() {
    if(this.formRegis.get('ward')?.errors?.['required']){
      this.messErrWard = 'Xã, phường không được để trống';
    }else{
      this.messErrWard=""
    }
  }
}
