import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent {
  @Input() title!: string;
  @Input() url!: string;
  @Output() closeTrailer = new EventEmitter<{ title: string; url: string; }>();
  @ViewChild('trailer') trailer!: ElementRef;

  toggleTrailer() {
    const iframe = (<HTMLElement>this.trailer.nativeElement).querySelector('iframe')!;
    // stop video
    iframe.src = iframe.src;
    this.closeTrailer.emit();
  }
}
