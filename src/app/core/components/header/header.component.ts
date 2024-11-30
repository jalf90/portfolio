import { Component } from '@angular/core';
import {
  faHome,
  IconDefinition,
  faContactCard,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgOptimizedImage } from '@angular/common';

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
  imports: [FontAwesomeModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected menuItems = MENU_ITEMS;
}
