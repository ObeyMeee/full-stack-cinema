import { Component, EventEmitter, Input, Output } from '@angular/core';
import { compareAsc, isFuture, isSameDay, isToday, isTomorrow } from 'date-fns';
import { SessionDto } from '../../poster/dto/session.dto';
import { DateDropdownService } from './date-dropdown.service';
import { openClosedAnimation } from '../animations';

@Component({
  selector: 'app-date-dropdown',
  templateUrl: './date-dropdown.component.html',
  styleUrls: ['./date-dropdown.component.scss'],
  animations: [
    openClosedAnimation('translate(-50%, -50%)', 'translate(-50%, -65%)', 0.5),
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
