import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _rendererFactory: RendererFactory2 = inject(RendererFactory2);
  private _renderer: Renderer2 = this._rendererFactory.createRenderer(null, null);
  private _currentTheme$: BehaviorSubject<Theme> = new BehaviorSubject<Theme>('light');

  constructor() {
    this._updateTheme(null, 'light');
  }

  public setTheme(newTheme: Theme) {
    this._updateTheme(this._currentTheme$.value, newTheme);
    this._currentTheme$.next(newTheme);
  }

  public getMode(): Observable<Theme> {
    return this._currentTheme$;
  }

  public toggleTheme(newTheme: Theme) {
    this._currentTheme$.value === 'light' ? this._updateTheme('light', 'dark') : this._updateTheme('dark', 'light');
  }

  private _updateTheme(currentTheme: Theme | null, newTheme: Theme) {
    if (currentTheme !== null) this._renderer.removeClass(document.body, currentTheme);
    this._renderer.addClass(document.body, newTheme);
  }
}
