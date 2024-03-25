import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  constructor() { }

  private dataBreadcrumb = new BehaviorSubject<any>([]);

  setBreadcrumb(data: any) {
    this.dataBreadcrumb.next(data);
  }

  getBreadcrumb() {
    return this.dataBreadcrumb.asObservable();
  }
}
