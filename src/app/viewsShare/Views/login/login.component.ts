import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
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
  constructor(private dialogRef: MatDialogRef<LoginComponent>,
              private userService : UserService,
              private toast: ToastrService) {
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
        localStorage.setItem('user',JSON.stringify(data.data))
        localStorage.setItem('sessionExpiration', Date.now() + 3600000 +'')
        this.userService.setUserCurrent(data.data);
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

    // if (num === 1)
    //   this.toggle1 = !this.toggle1;
    // else
    //   this.toggle2 = !this.toggle2;
  }

  // replaceSpacecurrentPassword(event: any) {
  //   const data = event.target.value.replace(/\s/g, '')
  //   this.changePasswordForm.patchValue({
  //     currentPassword: data,
  //   });
  //
  //   if(data===null || data===''){
  //     this.changePasswordForm.controls['currentPassword'].setErrors({isNull: true})
  //   }
  //
  //   setTimeout(() =>{
  //     if (data === '') {
  //       event.target.type = 'password';
  //       this.toggle1=false;
  //       this.changePasswordForm.controls['currentPassword'].setErrors({isNull: true})
  //     }
  //     return null;
  //   },100);
  // }
  openModal(templateForget: any) {

  }
}
