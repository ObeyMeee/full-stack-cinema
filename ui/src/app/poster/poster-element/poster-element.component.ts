import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {isFuture, isSameDay, isToday, isTomorrow} from "date-fns";
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
      .sort((a, b) => a.getTime() - b.getTime());
  }

  getDateType(date: Date): 'today' | 'tomorrow' | 'other' {
    if (isToday(date)) {
      return 'today';
    }
    return isTomorrow(date) ? 'tomorrow' : 'other';
  }

  onSelectDate(date: Date) {
    this.daySelectElementRef.nativeElement.classList.add('invisible');
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

}
