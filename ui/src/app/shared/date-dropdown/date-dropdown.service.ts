import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateDropdownService {
  private _isDaySelectionShown = false;

  get isDaySelectionShown() {
    return this._isDaySelectionShown;
  }

  set isDaySelectionShown(value: boolean) {
    this._isDaySelectionShown = value;
  }

  hideOnClick($event: MouseEvent) {
    if (!(<HTMLElement>$event.target).closest('.btn-selection-date')) {
      this.isDaySelectionShown = false;
    }
  }
}
