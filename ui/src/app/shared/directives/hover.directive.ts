import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  @Input() selector!: string;
  classToAdd = 'bg-cl-primary';
  @Input() classToRemove!: string;

  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.toggleClasses();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.toggleClasses();
  }

  private toggleClasses() {
    const element = (<HTMLElement>this.elementRef.nativeElement).querySelector(
      this.selector,
    );
    element?.classList.toggle(this.classToAdd);
    element?.classList.toggle(this.classToRemove);
  }
}
