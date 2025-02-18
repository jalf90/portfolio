import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faContactCard, faHome, IconDefinition, faSuitcase } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

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
  {
    id: 3,
    icon: faSuitcase,
    name: 'Work',
    url: 'work-experience',
  },
];

@Component({
  selector: 'app-nav',
  imports: [FaIconComponent, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent {
  protected menuItems = MENU_ITEMS;
}
