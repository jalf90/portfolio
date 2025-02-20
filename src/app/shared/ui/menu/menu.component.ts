import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItemProps<T> {
  id: number;
  label: string;
  value: T;
  icon?: string;
}

interface Position {
  top?: string;
  left?: string;
}

@Component({
  selector: 'app-menu',
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent<T> {
  @Input() menuItems!: MenuItemProps<T>[];
  @Output() menuItemClick: EventEmitter<T> = new EventEmitter<T>();
  @ViewChild('menuTrigger', { static: false }) menuTrigger!: ElementRef;
  @ViewChild('menuContainer', { static: false }) menuContainer!: ElementRef;
  protected isMenuOpen: WritableSignal<boolean> = signal<boolean>(false);
  menuStyles: Position = {};
  private clickOutsideListenerCleanup?: () => void;

  constructor(private renderer: Renderer2) {}

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
    if (this.isMenuOpen()) {
      this.calculatePosition();
      this.addClickOutsideListener();
    }
  }

  calculatePosition() {
    if (!this.menuTrigger || !this.menuContainer) {
      return;
    }

    const triggerRect = this.menuTrigger.nativeElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const menuHeight = this.menuContainer.nativeElement.offsetHeight;
    const menuWidth = this.menuContainer.nativeElement.offsetWidth;

    let top = triggerRect.bottom;
    let left = triggerRect.left;

    // Prevent the menu from overflowing the viewport
    if (top + menuHeight > viewportHeight) {
      top = triggerRect.top - menuHeight; // Position above the trigger
    }

    if (left + menuWidth > viewportWidth) {
      left = viewportWidth - menuWidth; // Align to the right
    }

    if (left < 0) {
      left = 0; // Prevent left overflow
    }

    this.menuStyles = {
      top: `${top}px`,
      left: `${left}px`,
    };
  }

  addClickOutsideListener() {
    setTimeout(() => {
      this.clickOutsideListenerCleanup = this.renderer.listen('document', 'click', (event: Event) => {
        if (this.menuContainer && !this.menuContainer.nativeElement.contains(event.target)) {
          this.isMenuOpen.set(false);
          this.removeClickOutsideListener();
        }
      });
    });
  }

  removeClickOutsideListener() {
    if (this.clickOutsideListenerCleanup) {
      this.clickOutsideListenerCleanup();
      this.clickOutsideListenerCleanup = undefined;
    }
  }

  handleMenuItemSelect(value: T): void {
    this.menuItemClick.emit(value);
    this.isMenuOpen.set(false);
    this.removeClickOutsideListener();
  }
}
