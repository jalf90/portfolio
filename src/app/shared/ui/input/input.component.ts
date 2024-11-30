import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { InputType } from '../../models/input.model';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor, Validator {
  @Input() label: string = '';
  @Input() type: InputType = 'text';
  @Input() placeholder: string = '';

  // Internal value of the input
  private _value: string = '';

  protected errors: WritableSignal<any> = signal<any>({});
  protected touched: WritableSignal<boolean> = signal<boolean>(false);

  // Getter and setter for the internal value
  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.onChange(val); // Notify the value change
    this.onValidatorChange(); // Notify validation changes
  }

  // Callback functions for ControlValueAccessor
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};
  private onValidatorChange: () => void = () => {};

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  isInvalid(): boolean {
    return this.touched() && !!this.errors();
  }

  // For Reactive Forms validation
  validate(control: AbstractControl): ValidationErrors | null {
    this.errors.set(control.errors);
    return control.errors;
  }

  // Called by Angular to set the initial value
  writeValue(value: any): void {
    this._value = value || '';
  }

  // Registers a change callback function
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // Registers a touch callback function
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // Optional: handle disabled state
  setDisabledState?(isDisabled: boolean): void {
    // Implement if the input should be disabled
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onValidatorChange = fn;
  }

  // Handle blur (mark as touched)
  onBlur(): void {
    this.touched.set(true);
    this.onTouched();
  }
}
