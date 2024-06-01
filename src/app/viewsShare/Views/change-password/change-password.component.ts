import {Component, OnInit} from '@angular/core';
import {ValidateInput} from "../../../../core/service/model/validate-input.model";
import {UserService} from "../user.service";
import {ToastrService} from "ngx-toastr";
import {MatDialog} from "@angular/material/dialog";
import {OrderService} from "../../../admin/Views/Pages/order-management/order.service";
import {CommonFunction} from "../../../../core/service/utils/common-function";
import {Router} from "@angular/router";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{

  toggle0=false;
  toggle1=false;
  toggle2=false;
  rePass="";
  currentPass="";
  newPass="";
  errRePasswordStr=""
  currentUser:any;
  constructor(private userService:UserService,
              private toast:ToastrService,
              public  dialog:MatDialog,
              public router:Router) {
    this.userService.getUserCurrent().subscribe((user:any)=>{
      if(user){
        this.currentUser = user;
      }else{
        this.toast.warning("Cần đăng nhập để thực hiện chức năng này")
      }
    })
  }
  ngOnInit(): void {
  }



  errPassword:ValidateInput=new ValidateInput();
  errCurrentPassword:ValidateInput=new ValidateInput();

  validatePassWord() {
    this.errPassword=CommonFunction.validateInputUTF8Space(this.newPass,15,/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,true, true)
  }

  validateRepass() {
    if(this.rePass != this.newPass){
      this.errRePasswordStr = "Không trùng khớp với mật khẩu"
    }else{
      this.errRePasswordStr = ""
    }

  }

  validateCurerntPassWord() {
    this.errCurrentPassword=CommonFunction.validateInputUTF8Space(this.currentPass,15,/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,true, true)
  }
  changeType(type:any, num:any) {
    if (type.type === 'password') {
      type.type = 'text';
    } else {
      type.type = 'password';
    }
    if(num==0){
      this.toggle0 = !this.toggle0;
    }else if(num==1){
      this.toggle1 = !this.toggle1;
    }else{
      this.toggle2 = !this.toggle2;
    }

  }

  changePass() {
    this.validateChangePass()
    if(!this.errCurrentPassword.done || !this.errPassword.done || this.errRePasswordStr){
      return
    }else{
      const user={
        userId: this.currentUser.id,
        password: this.newPass,
        currentPassword: this.currentPass
      }
      this.userService.changePass(user).subscribe((res:any)=>{
        if(res.status=="OK"){
          this.toast.success("Đổi mật khẩu thành công")
        }else{
          this.toast.error(res.message)
        }
      })
    }

  }
  validateChangePass(){
    this.validateCurerntPassWord()
    this.validateRepass()
    this.validatePassWord()
  }

  routerHome() {
    this.router.navigateByUrl("/home-page-content")
  }
}
