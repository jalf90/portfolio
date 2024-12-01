import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Language {
  id: number;
  name: string;
  code: string;
}

const LANGUAGES: Language[] = [
  { id: 1, name: 'English', code: 'en-US' },
  { id: 2, name: 'Français', code: 'fr-FR' },
];

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private _translate = inject(TranslateService);
  currentLang: WritableSignal<string> = signal<string>('en-US');

  switchLanguage(lang: string) {
    this.currentLang.set(lang);
    this._translate.use(lang);
  }

  getList(): Language[] {
    return LANGUAGES;
  }
}
