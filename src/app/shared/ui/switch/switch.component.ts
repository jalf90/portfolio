import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  model,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type ClassNames = 'small' | 'primary';

@Component({
  selector: 'app-switch',
  imports: [CommonModule, FormsModule],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SwitchComponent implements OnInit {
  @Input() classNames: ClassNames[] = [];
  @Input() showLabel: boolean = false;
  @Input() on: string = 'on';
  @Input() off: string = 'off';
  @Input() isActive?: boolean = false;
  @Output() change: EventEmitter<void> = new EventEmitter();

  protected isActiveModel = model<boolean>(this.isActive ?? false);

  protected onLabel$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  protected offLabel$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private _translateService: TranslateService,
    private _destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    // Set the labels initially
    this._setLabels();

    // Subscribe to language change events to update the labels dynamically
    this._translateService.onLangChange.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this._setLabels(); // Re-fetch translations when language changes
    });
  }

  // Method to fetch translations and emit new values
  private _setLabels(): void {
    this._translateService
      .get(this.on)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((translation: string) => {
        this.onLabel$.next(translation);
      });
    this._translateService
      .get(this.off)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((translation: string) => {
        this.offLabel$.next(translation);
      });
  }
}
