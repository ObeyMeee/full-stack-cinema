import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { compareAsc, isSameDay } from 'date-fns';
import { PosterDto } from '../dto/poster.dto';
import { SessionDto } from '../dto/session.dto';
import { firstValueFrom } from 'rxjs';
import { FilmService } from '../../film/film.service';
import { isSessionWithinPastThirtyMinutes } from '../../shared/session-utils';

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
  protected readonly isSessionWithinPastThirtyMinutes =
    isSessionWithinPastThirtyMinutes;

  constructor(private filmService: FilmService) {}

  async ngOnInit() {
    this.sessions = (
      await firstValueFrom(
        this.filmService.getSessionsById(this.poster.filmId).data,
      )
    ).sort((a, b) => compareAsc(a.startAt, b.startAt));
  }

  onHideDaySelection($event: Event) {
    if (
      !(<HTMLElement>$event.target).classList.contains('btn-selection-date')
    ) {
      this.hideDaySelection();
    }
  }

  hideDaySelection() {
    this.isDaySelectionHidden = true;
  }

  triggerOpenTrailerEvent() {
    this.openTrailer.emit({
      title: this.poster.title,
      url: this.poster.media.trailer,
    });
  }

  selectDate($event: Date) {
    this.selectedDate = $event;
    this.hideDaySelection();
  }
}
