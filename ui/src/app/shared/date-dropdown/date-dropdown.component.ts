import { Component, Input } from '@angular/core';
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
          transform: 'translate(-50%, -50%)',
        }),
      ),
      state(
        'closed',
        style({
          opacity: 0,
          transform: 'translate(-50%, -65%)',
        }),
      ),
      transition('open <=> closed', [animate('.4s ease-in-out')]),
    ]),
  ],
})
export class DateDropdownComponent {
  isDaySelectionHidden = true;
  selectedDate = new Date();
  selectDates!: Date[];
  @Input('sessions') sessions!: SessionDto[];

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
    this.hideDaySelection();
    this.selectedDate = date;
  }

  hideDaySelection() {
    this.isDaySelectionHidden = true;
  }

  onShowSchedule() {
    this.isDaySelectionHidden = false;
    this.selectDates = this.sessions
      .map((session) => session.startAt)
      .sort(compareAsc);
  }
}
