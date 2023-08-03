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
        style({ display: 'none' }),
        animate('.5s ease-in-out'),
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

  @Input('sessions') sessions!: SessionDto[];
  @Input('isDaySelectionHidden') isDaySelectionHidden!: boolean;
  @Output() selectDate = new EventEmitter<Date>();
  @Output() isDaySelectionHiddenChange = new EventEmitter<boolean>();

  protected readonly isSameDay = isSameDay;

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
    this.isDaySelectionHidden = true;
    this.isDaySelectionHiddenChange.emit(this.isDaySelectionHidden);
    this.selectedDate = date;
    this.selectDate.next(date);
  }

  onShowSchedule() {
    this.isDaySelectionHidden = false;
    this.isDaySelectionHiddenChange.emit(this.isDaySelectionHidden);
    this.dates = this.sessions
      .map((session) => session.startAt)
      .sort(compareAsc);
  }
}
