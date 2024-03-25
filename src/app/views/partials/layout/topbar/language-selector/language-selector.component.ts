import { Component, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { filter } from 'rxjs/operators';
// Translate
import { TranslationService } from 'src/core/_base/layout/service/translation.service'; 

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
  @Input() iconType: '' | 'brand' | undefined;

  language: LanguageFlag | undefined;
  languageSelect = 'vn';
  languages: LanguageFlag[] = [
    {
      lang: 'en',
      name: 'English',
      flag: ''
    },
    {
      lang: 'vn',
      name: 'Vietnamese',
      flag: ''
    },
  ];

  /**
   * Component constructor
   *
   * @param translationService: TranslationService
   * @param router: Router
   */
  constructor(private translationService: TranslationService, private router: Router) {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    this.setSelectedLanguage();
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(event => {
        this.setSelectedLanguage();
      });
  }

  changeLanguage(){
    console.log("change language: ", this.languageSelect);
    if(this.languageSelect){
      this.setLanguage(this.languageSelect)
    }
  }

  /**
   * Set language
   *
   * @param lang: any
   */
  setLanguage(lang:any) {
    console.log("change languae");
    
    
    this.languages.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
    this.translationService.setLanguage(lang);
    (document.querySelector('html') as HTMLHtmlElement).lang = lang
  }

  /**
   * Set selected language
   */
  setSelectedLanguage(): any {
    this.setLanguage(this.translationService.getSelectedLanguage());
  }
}
