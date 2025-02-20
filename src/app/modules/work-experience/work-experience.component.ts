import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { PdfReaderService } from '../../shared/services/pdf-reader.service';

interface IFormData {
  file: FormControl<File | null>;
  filename: FormControl<string>;
}

@Component({
  selector: 'app-work-experience',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.scss',
  host: {
    class: 'container',
  },
})
export class WorkExperienceComponent {
  private _pdfReaderService = inject(PdfReaderService);
  formGroup: FormGroup<IFormData> = new FormGroup<IFormData>({
    file: new FormControl<File | null>(null, Validators.required),
    filename: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  constructor() {
    this.formGroup.valueChanges.subscribe((v) => {
      console.log(v);
    });
  }

  async onFileSelected(event: any) {
    this.formGroup.patchValue({
      file: event.target.files[0],
    });
  }

  async onSubmit() {
    await this._pdfReaderService.readPdf(this.formGroup.value.file!);
  }
}
