import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBlur]',
})
export class BlurDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    const element: HTMLElement = this.elementRef.nativeElement;
    element.querySelector('.bg-image')?.classList.add('blurred');
    element.querySelector('.poster-content')?.classList.remove('invisible');
  }

  @HostListener('mouseleave') onMouseLeave() {
    const element: HTMLElement = this.elementRef.nativeElement;
    element.querySelector('.bg-image')?.classList.remove('blurred');
    element.querySelector('.poster-content')?.classList.add('invisible');
  }
}
