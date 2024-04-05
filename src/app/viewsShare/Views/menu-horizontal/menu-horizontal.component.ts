import {ChangeDetectorRef, Component, ElementRef, ViewChild} from '@angular/core';
import {CommonFunction} from "../../../../core/service/utils/common-function";
import {TranslationService} from "../../../../core/_base/layout/service/translation.service";

@Component({
  selector: 'app-menu-horizontal',
  templateUrl: './menu-horizontal.component.html',
  styleUrls: ['./menu-horizontal.component.scss']
})
export class MenuHorizontalComponent {
    @ViewChild('inputSearch') inputSearch: ElementRef;

  listHistory : any[];
  keyword : any;
  currentUser : any;
  checkLogin: boolean = false;
  listHistoryFilter : any[];
  showHistory : boolean=false;
  showAllHistory = false;
  srcFlag = "../../../../assets/media/img/h2Shop/flag_vn.png";
  constructor(private cdr : ChangeDetectorRef, private translationService: TranslationService) {
    this.listHistory=[];
    this.listHistoryFilter = [];
    this.srcFlag = "../../../../assets/media/img/h2Shop/flag_vn.png";
  }

  getHistory(){
    let history;
    this.listHistory = [];
    if(this.checkLogin){
      history = CommonFunction.getCookie(this.currentUser?.account);
    }else{
      history = CommonFunction.getCookie('user');
    }
    if(history){
      const encodedSearchHistory = JSON.parse(history);
      this.listHistory = encodedSearchHistory.map((item:any) => decodeURIComponent(item))
      if(this.keyword != ''){
        // this.listHistoryFilter = this.listHistory.filter(history =>  history.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1);
      }
    }
  }

    setHistory(){
        let index = this.listHistory.findIndex(value => value?.toLowerCase() === this.keyword.toLowerCase()) ;
        if(index >=0){
            this.listHistory.splice(index,1);
        }
        this.listHistory.unshift(this.keyword.trim() as string)
        if(this.listHistory.length > 10){
            this.listHistory.pop();
        }
        const encodedSearchHistory = this.listHistory.map((item:any) => encodeURIComponent(item));
        if(this.checkLogin){
            CommonFunction.setCookie(this.currentUser.account,JSON.stringify(encodedSearchHistory));
        }else{
            CommonFunction.setCookie('user',JSON.stringify(encodedSearchHistory));
        }
        this.cdr.detectChanges();
    }

    changeInputSearch(event:any){
        if(event != ''){
            this.listHistoryFilter = this.listHistory.filter((history:any) =>  history.toLowerCase().indexOf(event.toLowerCase()) !== -1);
        }
    }
    search(){
        if(this.keyword.trim().length > 0){
            this.setHistory();
            this.getHistory();
            // let keyword = this.keyword.trim();
            // this.router.navigateByUrl(`/system/home/search?keyword=${encodeURIComponent(keyword)}`)
        }else{
            // this.router.navigateByUrl(`/system/home/search`);
        }
        this.showHistory = false;
        this.inputSearch.nativeElement.blur();
    }

    clickItemHistory(item:any){
        this.keyword = item;
        this.search();
    }

    deleteAllHistory(event: any){
        event.stopPropagation();
        this.listHistory = [];
        this.clearHistory();
    }
    clearHistory(){
        if(this.checkLogin){
            CommonFunction.deleteCookie(this.currentUser.account);
        }else{
            CommonFunction.deleteCookie('user');
        }
    }

    showAllHistoryFunc(event:any){
        event.stopPropagation();
        this.showAllHistory = true
    }

    deleteItem(index: number,event: any){
        event.stopPropagation();
        this.listHistory.splice(index,1);
        if(this.listHistory.length == 0){
            this.clearHistory();
        }else{
            if(this.checkLogin){
                CommonFunction.setCookie(this.currentUser.account,JSON.stringify(this.listHistory));
            }else{
                CommonFunction.setCookie('user',JSON.stringify(this.listHistory));
            }
        }
        if(this.keyword != ''){
            this.listHistoryFilter = this.listHistory.filter((history:any) =>  history.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1);
        }
        this.cdr.detectChanges();
    }
    changeLanguage(language:string){
        this.translationService.setLanguage(language);
        if(language==='vn'){
          this.srcFlag = '../../../../assets/media/img/h2Shop/flag_vn.png';
        }else{
          this.srcFlag = '../../../../assets/media/img/h2Shop/flag_en.png'
        }
        console.log("Flag: ", this.srcFlag)
    }
}