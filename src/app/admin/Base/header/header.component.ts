import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../viewsShare/Views/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{



  constructor(private userService:UserService,private router:Router) {
  }
  logout() {
    this.userService.setUserCurrent(null);
    localStorage.removeItem('sessionExpiration');
    this.router.navigateByUrl('home-page-content')
  }
  shouldShowGoToAccount: any;
  goToAccount() {
    throw new Error('Method not implemented.');
  }
  goToChangePass() {
    throw new Error('Method not implemented.');
  }
  isAdmin = false;
  hasLogo =false;
  logoHeader = '';

  ngOnInit(): void {
    setInterval(() => {
      this.estimateLogOut();
    }, 1000);
  }

  estimateLogOut() {
    // Đây là hàm callback của bạn, sẽ được gọi mỗi giây
    const expiration = localStorage.getItem('sessionExpiration');
    if (expiration && Date.now() > parseInt(expiration, 10)) {
      this.userService.setUserCurrent(null)
      localStorage.removeItem('sessionExpiration');
      this.router.navigateByUrl('home-page-content')
    }
  }

}
