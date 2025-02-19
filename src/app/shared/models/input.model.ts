import { FormControl } from '@angular/forms';

export type InputType = 'text' | 'number' | 'password' | 'email' | 'search';
type ValueType = string | number | boolean;

export interface InputProps {
  type?: InputType;
  value?: ValueType;
  placeholder?: string;
  control?: FormControl;
  formGroupName?: string;
  controlKey?: string;
}

export interface InputGroupProps {
  error: string;
  label: string;
  inputProps?: InputProps;
}
