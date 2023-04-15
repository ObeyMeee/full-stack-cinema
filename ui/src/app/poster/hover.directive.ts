import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  constructor(private elementRef: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    (<HTMLElement>this.elementRef.nativeElement).querySelector('i')?.classList.add('icon-bg');
  }

  @HostListener('mouseleave') onMouseLeave() {
    (<HTMLElement>this.elementRef.nativeElement).querySelector('i')?.classList.remove('icon-bg');
  }
}
