import { Component, input, InputSignal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-avatar',
  imports: [NgOptimizedImage],
  template: `
    <img
      [ngSrc]="avatar()"
      alt="Avatar"
      class="avatar"
      [width]="width()"
      [height]="height()"
    />
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;

      .avatar {
        vertical-align: middle;
        border-radius: 50%;
      }
    }
  `,
})
export class AvatarComponent {
  avatar: InputSignal<string> = input<string>('/assets/images/avatar.png');
  width: InputSignal<number> = input<number>(25);
  height: InputSignal<number> = input<number>(25);
}
