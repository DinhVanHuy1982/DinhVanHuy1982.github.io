import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ValidateInput} from "../model/validate-input.model";

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

  static replaceAll(str:string, find:string, replace:string) {
    return str?.replace(new RegExp(find, 'g'), replace) ?? str;
  }

  static validateInputUTF8Space(text:string,maxLength:number,regex:any, hasUTF8:any, hasSpace:any){
    let result:ValidateInput = new ValidateInput()
    const err = this.validateInputUTF8SpaceModel(text,maxLength,regex, hasUTF8, hasSpace);
    if(err!=undefined && err!=null){
      result = err
    }

    if(result.empty === false && result.UTF8 ===false && result.space ===false && result.maxLength === false && result.regex === false){
      result.done = true
    }
    return result;
  }

  static validateInputUTF8SpaceModel(text:any,maxLength:number,regex:any, hasUTF8:any, hasSpace:any){
    const result:ValidateInput = new ValidateInput();
    const regexUTF8 = /[^\u0000-\u007F]+/;

    if(this.trimText(text) === null){
      result.empty = true
      return result;
    }else{
      text = text.toString()
      text = text.trim()
      if(text.length === 0){
        result.empty = true
        return result;
      }
      if(hasUTF8){
        if (regexUTF8.test(text)) {
          result.UTF8 = true
          return result;
        }
      }
      if(hasSpace){
        if (text.includes(' ')) {
          result.space = true
          return result;
        }
      }
      if(maxLength !== null){
        if(text.length > maxLength){
          result.maxLength = true
          return result;
        }
      }
      if(regex !== null){
        if(!text.match(regex)){
          result.regex = true
          return result;
        }
      }

      return null;
    }
  }

  static trimText(text:any){
    if(text !== null && text !== undefined){
      text = text.toString()
      return text.trim()
    }else{
      return null
    }
  }

  static validateInput(text:any,maxLength:any,regex:any){
    let result:ValidateInput = new ValidateInput();
    const err = this.validateInputModel(text,maxLength,regex);
    if( err){
      result = err
    }

    if(result.empty === false && result.maxLength === false && result.regex === false){
      result.done = true
    }
    return result;
  }
  static validateInputModel(text:any,maxLength:any,regex:any){
    const result:ValidateInput = new ValidateInput();
    if(this.trimText(text) === null){
      result.empty = true
      return result
    }else{
      text = text.toString()
      text = text.trim()
      if(text.length === 0){
        result.empty = true
        return result
      }
      if(maxLength !== null){
        if(text.length > maxLength){
          result.maxLength = true
          return result
        }
      }
      if(regex !== null){
        if(!text.match(regex)){
          result.regex = true
          return result
        }
      }
      return null;
    }

  }
}
