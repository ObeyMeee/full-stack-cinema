import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @Input() element!: HTMLElement;

  @HostListener('click') click() {
    this.element.classList.toggle('invisible');
  }
}
