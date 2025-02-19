import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  constructor(private _sanitizer: DomSanitizer) {}

  transform(value: string, ...args: string[]): unknown {
    const filterText = args[0];

    if (!filterText.length) return value;

    const index = value.toLowerCase().indexOf(filterText.toLowerCase());

    let finalText = value.slice(0, index);
    const textBolded = value.slice(index, filterText.length);

    finalText += this._sanitizer?.sanitize(SecurityContext.HTML, `<b>${textBolded}</b>`);
    finalText += value.slice(filterText.length, value.length);
    return finalText;
  }
}
