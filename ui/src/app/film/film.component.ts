import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FilmService} from './film.service';
import {Film} from "./models/film.model";
import {ActivatedRoute} from "@angular/router";
import {firstValueFrom, Observable} from "rxjs";
import {SessionDto} from "../poster/dto/session.dto";
import {differenceInMinutes, isFuture, isPast, isSameDay, isToday, isTomorrow} from "date-fns";


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  film$!: Observable<Film>;
  sessions!: SessionDto[];
  selectedDate = new Date();
  @ViewChild('daySelect') daySelectElementRef!: ElementRef;
  protected readonly isSameDay = isSameDay;

  constructor(private filmService: FilmService,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.film$ = this.filmService.getFilm(id);
    this.sessions = await firstValueFrom(this.filmService.getSessionsById(id));
  }

  mapStartAtDates() {
    return this.sessions.map(session => session.startAt)
      .sort((a, b) => a.getTime() - b.getTime());
  }

  getDateType(date: Date): 'today' | 'tomorrow' | 'other' {
    if (isToday(date)) {
      return 'today';
    }
    return isTomorrow(date) ? 'tomorrow' : 'other';
  }

  isTodayOrFuture(date: Date) {
    return isToday(date) || isFuture(date);
  }

  onSelectDate(date: Date) {
    this.selectedDate = date;
    (<HTMLElement>this.daySelectElementRef.nativeElement).classList.add('invisible');
  }

  isSessionWithinPastThirtyMinutes(session: SessionDto) {
    const now = new Date();
    const SECONDS_PER_MINUTE = 60;
    const minutes = 30;
    const THIRTY_MINUTES = SECONDS_PER_MINUTE * minutes;
    return isPast(session.startAt) && differenceInMinutes(now, session.startAt) < THIRTY_MINUTES;
  }
}
