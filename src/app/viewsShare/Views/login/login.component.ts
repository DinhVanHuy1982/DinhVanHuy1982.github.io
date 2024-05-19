import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../user.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  userName='';
  password='';
  userNameForgot='';
  codeVerify="";
  constructor(private dialogRef: MatDialogRef<LoginComponent>,
              private userService : UserService,
              private toast: ToastrService,
              public dialog: MatDialog) {
  }

  close(){
    this.dialogRef.close();
  }
  login(){
    const userLogin = {
      username: this.userName,
      password: this.password
    }
    this.userService.userLogin(userLogin).subscribe((data:any)=>{
      if(data.status=='OK'){
        localStorage.setItem('sessionExpiration', Date.now() + 3600000 +'')
        this.userService.setUserCurrent(data.data);
        localStorage.setItem('user',JSON.stringify(data.data))
        this.toast.success(data.message);
        this.dialogRef.close();

      }else{
        this.toast.error(data.message);
      }
    },(error:any) => {
      this.toast.error("Mất kết nối với server")
    })
  }

  toggle1: any = false;
  changeType(type:any, num:any) {
    if (type.type === 'password') {
      type.type = 'text';
    } else {
      type.type = 'password';
    }
    this.toggle1 = !this.toggle1;
  }

  openModal(templateForget: any) {
    const dialogConfig={
      height: '40vh',
      width:'500px',
      maxHeight: '90vh',
      maxWidth: '90vw',
      disableClose: false,
      hasBackdrop: true
    };
      this.dialog.open(templateForget,dialogConfig)

  }
  errUserNameForgot="";
  errValidateCode="";

  verify() {
    if(this.validateSendCode(2)){
      const user={
        username:this.userNameForgot,
        codeReset:this.codeVerify
      }
      this.userService.confirmCodeVerify(user).subscribe((res:any)=>{
        if(res.status=="OK"){
          this.toast.success(res.message)
          this.userNameForgot="";
          this.codeVerify="";
          this.dialog.closeAll()
        }else{
          this.toast.warning(res.message)
        }
      })
    }
  }
  timeLeft: number = 0; // Đếm ngược từ 2 phút (2 phút = 120 giây)
  interval: any;

  sendCode() {
    if(this.validateSendCode(1)){
      this.userService.forgotPassWord(this.userNameForgot).subscribe((res:any)=>{
        if(res.status=="OK"){
          this.timeLeft=120; // Đếm ngược từ 2 phút (2 phút = 120 giây)
          this.startCountdown();
        }else{
          this.toast.warning(res.message)
        }
      });
    }
  }

  validateSendCode(type:any){
    this.errUserNameForgot=""
    this.errValidateCode=""
    if(this.userNameForgot.trim()==""){
      this.errUserNameForgot="Tên đăng nhập không được để trống";
    }else {
      this.errUserNameForgot=""
    }

    if(type==2){
      if(this.codeVerify.trim()==""){
        this.errValidateCode="Mã xác nhận không được để trống";
      }else if(this.timeLeft <= 0){
        this.errValidateCode="Đã quá thời gian xác nhận";
      }else{
        this.errValidateCode=""
      }
    }

    return this.errValidateCode=="" && this.errUserNameForgot==""


  }
  startCountdown() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }
  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
}
