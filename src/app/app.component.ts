import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Portfolio';

  constructor(private translate: TranslateService) {
    const languageCode = sessionStorage.getItem('languageCode');
    // Set default language
    this.translate.setDefaultLang(languageCode ?? 'en-US');
    this.translate.use(languageCode ?? 'en-US'); // Use a specific language
  }
}
