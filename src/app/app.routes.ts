import { Routes } from '@angular/router';
import { WelcomeComponent } from './modules/home/components/welcome/welcome.component';
import { ContactMeComponent } from './modules/home/components/contact-me/contact-me.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'contact-me', component: ContactMeComponent },
];
