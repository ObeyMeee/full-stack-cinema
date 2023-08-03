import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { compareAsc, differenceInMinutes, isPast, isSameDay } from 'date-fns';
import { PosterDto } from '../dto/poster.dto';
import { SessionDto } from '../dto/session.dto';
import { firstValueFrom } from 'rxjs';
import { FilmService } from '../../film/film.service';

@Component({
  selector: 'app-poster-element',
  templateUrl: './poster-element.component.html',
  styleUrls: ['./poster-element.component.scss'],
})
export class PosterElementComponent implements OnInit {
  @Input() poster!: PosterDto;
  isDaySelectionHidden = true;
  selectedDate = new Date();
  sessions!: SessionDto[];
  @Output() openTrailer = new EventEmitter<{ title: string; url: string }>();

  protected readonly isSameDay = isSameDay;

  constructor(private filmService: FilmService) {}

  async ngOnInit() {
    this.sessions = await firstValueFrom(
      this.filmService.getSessionsById(this.poster.filmId),
    );
  }

  onHideDaySelection($event: Event) {
    if (
      !(<HTMLElement>$event.target).classList.contains('poster__day-selection')
    ) {
      this.hideDaySelection();
    }
  }

  hideDaySelection() {
    this.isDaySelectionHidden = true;
  }

  sessionsSorted() {
    return this.sessions.sort((a, b) => compareAsc(a.startAt, b.startAt));
  }

  isSessionWithinPastThirtyMinutes(session: SessionDto) {
    const now = new Date();
    const SECONDS_PER_MINUTE = 60;
    const minutes = 30;
    const THIRTY_MINUTES = SECONDS_PER_MINUTE * minutes;
    return (
      isPast(session.startAt) &&
      differenceInMinutes(now, session.startAt) < THIRTY_MINUTES
    );
  }

  triggerOpenTrailerEvent() {
    this.openTrailer.emit({
      title: this.poster.title,
      url: this.poster.media.trailer,
    });
  }
}
