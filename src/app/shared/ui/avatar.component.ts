import { Component, input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [NgOptimizedImage],
  template: `
    <img
      [ngSrc]="avatar()"
      alt="Avatar"
      class="avatar"
      width="25"
      height="25"
    />
  `,
})
export class AvatarComponent {
  avatar = input<string>('/assets/images/avatar.png');
}
