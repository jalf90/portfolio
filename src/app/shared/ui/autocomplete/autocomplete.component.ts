import { Component, EventEmitter, Input, model, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '@ui/input/input.component';
import { HighlightPipe } from '../../pipes/highlight.pipe';

@Component({
  selector: 'app-autocomplete',
  imports: [FormsModule, InputComponent, HighlightPipe],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.scss',
})
export class AutocompleteComponent<T> implements OnInit {
  @Input({ required: true }) items!: T[];
  @Input({ required: true }) key!: keyof T;
  @Input() placeholder?: string = '';
  @Output() itemChange = new EventEmitter<T>();

  protected showMenu = signal<boolean>(false);
  protected filteredItems = signal<T[]>([]);

  searchText = model<string>('');

  getValueAsString(value: T[keyof T]): string {
    return value as string;
  }

  ngOnInit() {
    this.filteredItems.set(this.items);
  }

  filterItems() {
    const filteredResult = this.items.filter((i) => {
      if (typeof this.key === 'string') {
        const value: string = i[this.key] as string;
        return value.toLowerCase().includes(this.searchText().toLowerCase());
      }
      return i;
    });

    this.filteredItems.set(filteredResult);
  }

  onSelect(item: T) {
    this.searchText.set(item[this.key] as string);
    this.showMenu.set(!this.showMenu());
    this.itemChange.emit(item);
  }
}
