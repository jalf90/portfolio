import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClassNames, SwitchComponent } from '@ui/switch/switch.component';

@Component({
  selector: 'app-theme-switcher',
  imports: [SwitchComponent],
  template: `
    <app-switch
      [showLabel]="true"
      on="theme.dark"
      off="theme.light"
      [classNames]="switchClassNames"
      (click)="switchTheme()"
    ></app-switch>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ThemeSwitcherComponent {
  isDarkMode: boolean = false;
  switchClassNames: ClassNames[] = ['small'];

  switchTheme(): void {
    // Toggle the theme by setting the "data-theme" attribute on the <body>
    this.isDarkMode = !this.isDarkMode;
    document.body.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');
  }
}
