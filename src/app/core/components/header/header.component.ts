import { Component, inject } from '@angular/core';
import {
  faHome,
  IconDefinition,
  faContactCard,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslationService } from '../../../shared/services/translation.service';
import { AvatarComponent } from '@ui/avatar.component';
import { MenuComponent, MenuItemProps } from '@ui/menu/menu.component';
import { TranslatePipe } from '@ngx-translate/core';

interface IMenuItem {
  id: number;
  icon: IconDefinition;
  name: string;
  url: string;
}

const MENU_ITEMS: IMenuItem[] = [
  {
    id: 1,
    icon: faHome,
    name: 'Home',
    url: '',
  },
  {
    id: 2,
    icon: faContactCard,
    name: 'Contact',
    url: 'contact-me',
  },
];

@Component({
  selector: 'app-header',
  imports: [FontAwesomeModule, AvatarComponent, MenuComponent, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected translationService = inject(TranslationService);
  protected menuItems = MENU_ITEMS;
  protected languagesList = this.translationService.getList().map(
    (language) =>
      ({
        id: language.id,
        label: language.name,
        value: language.code,
      }) as MenuItemProps<string>
  );
}
