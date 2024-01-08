import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { differenceInMonths, isAfter, isFuture } from 'date-fns';
import { now } from 'lodash';

export function productionYearValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const FIRST_FILM_RELEASED_AT = new Date(1895, 11, 27);
    const isValid = value > FIRST_FILM_RELEASED_AT;
    return !isValid ? { min: true } : null;
  };
}

export function startReleaseAtValidator() {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: Date = control.value;
    if (!value) return null;

    const isWithinMonth = differenceInMonths(now(), value) <= 0;
    return isWithinMonth ? null : { min: true };
  };
}

export function endReleaseAtValidator(form: FormGroup): ValidatorFn {
  return (_: AbstractControl): ValidationErrors | null => {
    const endReleaseAt: Date = form.get('additionalInfo.endReleaseAt')?.value;
    if (!endReleaseAt) return null;

    const startReleaseAt: Date = form.get('additionalInfo.startReleaseAt')?.value;
    const endReleaseGreaterThanStart = isAfter(endReleaseAt, startReleaseAt);
    const isValueFuture = isFuture(endReleaseAt);
    if (isValueFuture && endReleaseGreaterThanStart) return null;

    return !isValueFuture ? { isFuture: true } : { endReleaseGreaterThanStart: true };
  };
}

export function notBlankValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (!value) return null;

    // if the value is not blank then there is no error, otherwise blank error appears
    return value.trim() ? null : { blank: true };
  };
}

export function sessionStartAtValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: Date = control.value;
    if (!value) return null;

    return isFuture(value) ? null : { isFuture: true };
  };
}
