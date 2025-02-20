import { Inject, Injectable } from '@angular/core';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PdfReaderService {
  private _document: Document;
  extractedText: string = '';

  constructor(@Inject(DOCUMENT) document: Document) {
    this._document = document;

    //  Angular still requires a worker file path, even though PDF.js v4+ is supposed to handle it internally
    GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.mjs';
  }

  public async readPdf(file: File): Promise<void> {
    const reader = new FileReader();

    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result as ArrayBuffer);
      const pdf = await getDocument({ data: typedArray }).promise;

      let text = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        text += textContent.items.map((item: any) => item.str).join(' ') + '\n';
      }

      this.extractedText = text; // ✅ Successfully extracted text!
    };

    reader.readAsArrayBuffer(file);
  }
}
