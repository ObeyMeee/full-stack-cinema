import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {compareAsc, differenceInMinutes, isFuture, isPast, isSameDay, isToday, isTomorrow} from "date-fns";
import {PosterDto} from "../dto/poster.dto";
import {SessionDto} from "../dto/session.dto";
import {PosterService} from "../poster.service";
import {firstValueFrom} from "rxjs";
import {FilmService} from "../../film/film.service";

@Component({
  selector: 'app-poster-element',
  templateUrl: './poster-element.component.html',
  styleUrls: ['./poster-element.component.css']
})
export class PosterElementComponent implements OnInit {
  @Input() poster!: PosterDto;
  @ViewChild('daySelect') daySelectElementRef!: ElementRef;
  selectDates!: Date[];
  selectedDate = new Date();
  sessions!: SessionDto[];

  protected readonly isSameDay = isSameDay;

  constructor(private posterService: PosterService,
              private filmService: FilmService) {
  }

  async ngOnInit() {
    this.sessions = await firstValueFrom(this.filmService.getSessionsById(this.poster.filmId));
  }


  onShowSchedule() {
    this.daySelectElementRef.nativeElement.classList.toggle('invisible');
    this.selectDates = this.sessions.map(session => session.startAt)
      .sort(compareAsc);
  }

  getDateType(date: Date): 'today' | 'tomorrow' | 'other' {
    if (isToday(date)) {
      return 'today';
    }
    return isTomorrow(date) ? 'tomorrow' : 'other';
  }

  onSelectDate(date: Date) {
    this.hideDaySelection();
    this.selectedDate = date;
  }

  onHideDaySelection($event: Event) {
    if (!(<HTMLButtonElement>$event.target).classList.contains('show-schedule-list')) {
      this.hideDaySelection();
    }
  }

  hideDaySelection() {
    this.daySelectElementRef.nativeElement.classList.add('invisible');
  }

  isTodayOrFuture(date: Date) {
    return isToday(date) || isFuture(date);
  }

  sessionsSorted() {
    return this.sessions.sort((a, b) => compareAsc(a.startAt, b.startAt));
  }

  isSessionWithinPastThirtyMinutes(session: SessionDto) {
    const now = new Date();
    const SECONDS_PER_MINUTE = 60;
    const minutes = 30;
    const THIRTY_MINUTES = SECONDS_PER_MINUTE * minutes;
    return isPast(session.startAt) && differenceInMinutes(now, session.startAt) < THIRTY_MINUTES;
  }
}
