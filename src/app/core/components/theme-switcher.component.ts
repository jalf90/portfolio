import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  imports: [],
  template: `
    <div>
      <button (click)="switchTheme()">Switch Theme</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ThemeSwitcherComponent {
  currentTheme: 'light' | 'dark' = 'light';

  switchTheme(): void {
    // Toggle the theme by setting the "data-theme" attribute on the <body>
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', this.currentTheme);
  }
}
