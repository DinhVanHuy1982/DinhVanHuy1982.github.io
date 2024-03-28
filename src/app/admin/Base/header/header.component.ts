import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  logout() {
    throw new Error('Method not implemented.');
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
}
