import { Component } from '@angular/core';
import { AvatarComponent } from '@ui/avatar.component';

@Component({
  selector: 'app-welcome',
  imports: [AvatarComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
  standalone: true,
})
export class WelcomeComponent {}
