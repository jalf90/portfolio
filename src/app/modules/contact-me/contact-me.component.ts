import { Component, inject } from '@angular/core';
import { InputComponent } from '@ui/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-me',
  imports: [InputComponent, ReactiveFormsModule, TranslateModule],
  templateUrl: './contact-me.component.html',
  styleUrl: './contact-me.component.scss',
})
export class ContactMeComponent {
  private _fb = inject(FormBuilder);

  protected formGroup: FormGroup = this._fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
  });

  handleSubmit(e: Event) {
    e.preventDefault();
  }
}
