import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../viewsShare/Views/user.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{



  constructor(private userService:UserService,private router:Router, private dialog: MatDialog) {
  }
  logout() {
    this.userService.setUserCurrent(null);
    localStorage.removeItem('sessionExpiration');
    localStorage.removeItem('user');
    this.router.navigateByUrl('home-page-content')
  }
  shouldShowGoToAccount: any;
  goToAccount() {
    this.router.navigateByUrl("/my-account")
  }
  goToChangePass() {
    this.router.navigateByUrl("/change-pass-account")
  }
  isAdmin = false;
  hasLogo =false;
  logoHeader = '';
  currentUser:any;
  ngOnInit(): void {
    this.userService.getUserCurrent().subscribe((user:any)=>{
      this.currentUser= user;
    })
    setInterval(() => {
      this.estimateLogOut();
    }, 1000);
  }
  getLastThreeCharsOfLastWord(input: string): string {
    if (!input) return '';
    const words = input.split(' ');
    const lastWord = words[words.length - 1];
    return lastWord.slice(-3);
  }

  estimateLogOut() {
    // Đây là hàm callback của bạn, sẽ được gọi mỗi giây
    const expiration = localStorage.getItem('sessionExpiration');
    if (expiration && Date.now() > parseInt(expiration, 10)) {
      this.userService.setUserCurrent(null)
      localStorage.removeItem('sessionExpiration');
      localStorage.removeItem('user');
      this.dialog.closeAll();
      this.router.navigateByUrl('home-page-content')
    }
  }

}
