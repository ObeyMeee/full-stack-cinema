import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {differenceInMinutes, isFuture, isPast, isSameDay, isToday, isTomorrow} from "date-fns";
import {firstValueFrom, Observable} from "rxjs";
import {Film} from "../model/film.model";
import {FilmService} from "../film.service";
import {ActivatedRoute} from "@angular/router";
import {SessionDto} from "../../poster/dto/session.dto";

@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',
  styleUrls: ['./film-info.component.css']
})
export class FilmInfoComponent implements OnInit {
  film$!: Observable<Film>;
  sessions!: SessionDto[];
  selectedDate = new Date();

  @ViewChild('daySelect') daySelectElementRef!: ElementRef;
  protected readonly isSameDay = isSameDay;

  constructor(private filmService: FilmService,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    const id = this.route.parent?.snapshot.params['id'];
    this.film$ = this.filmService.getById(id);
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
