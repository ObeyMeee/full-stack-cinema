import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { compareAsc, isSameDay } from 'date-fns';
import { PosterDto } from '../dto/poster.dto';
import { SessionDto } from '../dto/session.dto';
import { firstValueFrom } from 'rxjs';
import { FilmService } from '../../film/film.service';
import { isSessionWithinPastThirtyMinutes } from '../../shared/session-utils';
import { DateDropdownService } from '../../shared/date-dropdown/date-dropdown.service';

@Component({
  selector: 'app-poster-element',
  templateUrl: './poster-element.component.html',
  providers: [DateDropdownService],
  styleUrls: ['./poster-element.component.scss'],
})
export class PosterElementComponent implements OnInit {
  @Input() poster!: PosterDto;
  selectedDate = new Date();
  sessions!: SessionDto[];
  @Output() openTrailer = new EventEmitter<{ title: string; url: string }>();

  protected readonly isSameDay = isSameDay;
  protected readonly isSessionWithinPastThirtyMinutes =
    isSessionWithinPastThirtyMinutes;

  constructor(
    private filmService: FilmService,
    private dateDropdownService: DateDropdownService,
  ) {}

  async ngOnInit() {
    this.sessions = (
      await firstValueFrom(
        this.filmService.getSessionsById(this.poster.filmId).data,
      )
    ).sort((a, b) => compareAsc(a.startAt, b.startAt));
  }

  onHideDaySelection($event: MouseEvent) {
    this.dateDropdownService.hideOnClick($event);
  }

  hideDaySelection() {
    this.dateDropdownService.isDaySelectionShown = false;
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
