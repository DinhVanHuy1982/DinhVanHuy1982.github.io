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
    })
  }
}
