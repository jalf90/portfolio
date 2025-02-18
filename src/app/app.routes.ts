import { Routes } from '@angular/router';
import { WelcomeComponent } from './modules/home/components/welcome/welcome.component';
import { ContactMeComponent } from './modules/contact-me/contact-me.component';
import { WorkExperienceComponent } from './modules/work-experience/work-experience.component';

export const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'contact-me', component: ContactMeComponent },
  { path: 'work-experience', component: WorkExperienceComponent },
];
