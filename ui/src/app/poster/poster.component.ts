import {Component, OnInit} from '@angular/core';
import {PosterService} from "./poster.service";
import {Observable} from "rxjs";
import {PosterDto} from "./dto/poster.dto";
import {SessionDto} from "./dto/session.dto";
import {isFuture, isSameDay, isToday, isTomorrow} from "date-fns";

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css']
})
export class PosterComponent implements OnInit {
  posters$!: Observable<PosterDto[]>;
  map!: Map<string, SessionDto[]>;
  responsiveOptions: any;
  currentSelectDates!: Date[];
  selectedDate = new Date();
  protected readonly isSameDay = isSameDay;

  constructor(private posterService: PosterService) {
    this.responsiveOptions = [
      {
        breakpoint: '1920px',
        numVisible: 4,
        numScroll: 3
      },
      {
        breakpoint: '1440px',
        numVisible: 3,
        numScroll: 2
      },
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
    this.posters$ = this.posterService.getPoster();
    this.posterService.getSessions().subscribe(response => this.map = response);
  }

  onShowSchedule(filmId: string, daySelect: HTMLElement) {
    daySelect.classList.toggle('invisible');
    this.currentSelectDates = this.map.get(filmId)!
      .map(session => new Date(Date.parse(session.startAt)))
      .sort((a, b) => a.getTime() - b.getTime());
  }

  getDateType(date: Date): 'today' | 'tomorrow' | 'other' {
    if (isToday(date)) {
      return 'today';
    }
    if (isTomorrow(date)) {
      return 'tomorrow';
    }
    return 'other';
  }

  onSelectDate(date: Date, daySelectElement: HTMLElement) {
    daySelectElement.classList.add('invisible');
    this.selectedDate = date;
  }

  isDateSelected(startAtStr: string) {
    const startAt = new Date(Date.parse(startAtStr));
    return isSameDay(startAt, this.selectedDate);
  }


  onHideDaySelection(daySelectElement: HTMLElement, $event: MouseEvent) {
    if (!(<HTMLButtonElement>$event.target).classList.contains('show-schedule-list')) {
      daySelectElement.classList.add('invisible');
    }
  }

  isTodayOrFuture(date: Date) {
    return isToday(date) || isFuture(date);
  }
}
