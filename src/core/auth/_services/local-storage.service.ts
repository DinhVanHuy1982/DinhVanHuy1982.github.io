import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public readonly CURRENT_USER = 'currentUser';
  encodeItem: any
  decodeItem: any

  /**
   * Constructor with service injection
   * @param storage
   */
  constructor() {
  }

  /**
   * get data of given key
   * @param key
   */
  get(key: string): any {
    let item = localStorage.getItem(key);
    if (item === 'undefined') {
      return undefined;
    } else {
      // item = JSON.parse(item);
      if(item != null){
        this.decodeItem = CryptoJS.AES.decrypt(item, environment.SCHOOL_CODE)
        item = JSON.parse(this.decodeItem.toString(CryptoJS.enc.Utf8))
      }
    }
    return item;
  }

  /**
   * set value on given key
   * @param key
   * @param value
   */
  set(key: string, value: any) {
    if(value != null){
      this.encodeItem = CryptoJS.AES.encrypt(JSON.stringify(value), environment.SCHOOL_CODE).toString();
    }
    localStorage.setItem(key, this.encodeItem);
  }

  /**
   * remove given key
   * @param key
   */
  remove(key: string) {
    // if (this.subjects.has(key)) {
    //   this.subjects.get(key).complete();
    //   this.subjects.delete(key);
    // }
    // this.storage.removeItem(key);
  }

  /**
   * clear all available keys
   */
  clear() {
    // this.subjects.clear();
    // this.storage.clear();
  }
}
