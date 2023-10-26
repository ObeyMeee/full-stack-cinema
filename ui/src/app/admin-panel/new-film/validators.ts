import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isFuture } from 'date-fns';

export function productionYearValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const FIRST_FILM_RELEASED_AT = new Date(1895, 11, 27);
    const isValid = value > FIRST_FILM_RELEASED_AT;
    return !isValid ? { min: true } : null;
  };
}

export function endReleaseAtValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: Date = control.value;
    if (!value) return null;

    const isValid = isFuture(value);
    return !isValid ? { isFuture: true } : null;
  };
}
