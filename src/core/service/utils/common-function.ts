import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

export class CommonFunction {

  // Hàm lấy Cookie
  static getCookie(cname:any) {
      var name = cname + '=';
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
      }
      return "";
  }

    // Hàm set Cookie
    static setCookie(cname :any, cvalue:any) {
        document.cookie = cname + '=' + cvalue;
    }

    static deleteCookie(cname:any){
        document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    }
}
