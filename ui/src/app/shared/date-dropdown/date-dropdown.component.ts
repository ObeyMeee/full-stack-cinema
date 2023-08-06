import { Component, EventEmitter, Input, Output } from '@angular/core';
import { compareAsc, isFuture, isSameDay, isToday, isTomorrow } from 'date-fns';
import { SessionDto } from '../../poster/dto/session.dto';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DateDropdownService } from './date-dropdown.service';

@Component({
  selector: 'app-date-dropdown',
  templateUrl: './date-dropdown.component.html',
  styleUrls: ['./date-dropdown.component.scss'],
  animations: [
    trigger('openClosed', [
      state(
        'open',
        style({
          opacity: 1,
          height: '*',
          transform: 'translate(-50%, -50%)',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          height: 0,
          display: 'none',
          transform: 'translate(-50%, -65%)',
        }),
      ),
      transition('closed => open', [
        animate('.5s ease-in-out'),
        style({ display: 'none' }),
      ]),
      transition('open => closed', [
        style({ display: 'block' }),
        animate('.5s ease-in-out'),
      ]),
    ]),
  ],
})
export class DateDropdownComponent {
  selectedDate = new Date();
  dates: Date[] = [];

  @Input() sessions!: SessionDto[];
  @Output() selectDate = new EventEmitter<Date>();

  protected readonly isSameDay = isSameDay;

  constructor(public service: DateDropdownService) {}

  isTodayOrFuture(date: Date) {
    return isToday(date) || isFuture(date);
  }

  getDateType(date: Date): 'today' | 'tomorrow' | 'other' {
    if (isToday(date)) {
      return 'today';
    }
    return isTomorrow(date) ? 'tomorrow' : 'other';
  }

  onSelectDate(date: Date) {
    this.service.isDaySelectionShown = false;
    this.selectedDate = date;
    this.selectDate.next(date);
  }

  onShowSchedule() {
    this.service.isDaySelectionShown = !this.service.isDaySelectionShown;
    this.dates = this.sessions
      .map((session) => session.startAt)
      .sort(compareAsc);
  }
}
