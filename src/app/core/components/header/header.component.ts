import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { faHome, IconDefinition, faContactCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslationService } from '../../../shared/services/translation.service';
import { AvatarComponent } from '@ui/avatar.component';
import { MenuComponent, MenuItemProps } from '@ui/menu/menu.component';
import { TranslatePipe } from '@ngx-translate/core';
import { ThemeSwitcherComponent } from '../theme-switcher.component';
import { NavComponent } from '@ui/nav/nav.component';

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, AvatarComponent, MenuComponent, TranslatePipe, ThemeSwitcherComponent, NavComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected translationService = inject(TranslationService);
  protected languagesList = this.translationService.getList().map(
    (language) =>
      ({
        id: language.id,
        label: language.name,
        value: language.code,
      }) as MenuItemProps<string>
  );

  handleMenuItemClick(languageCode: string) {
    this.translationService.switchLanguage(languageCode);
    sessionStorage.setItem('languageCode', languageCode);
  }
}
