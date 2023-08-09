import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss'],
})
export class TrailerComponent {
  @Input() title!: string;
  @Input() url!: string;
  @Output() closeTrailer = new EventEmitter<{ title: string; url: string }>();
  @ViewChild('trailer') trailerRef!: ElementRef;

  close() {
    const trailer = <HTMLIFrameElement>this.trailerRef.nativeElement;

    // stop video
    trailer.src = trailer.src;
    this.closeTrailer.emit();
  }
}
