import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appHasUpperCase]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: HasUpperCaseDirective,
    multi: true
  }]
})
export class HasUpperCaseDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return /[A-Z]+/.test(value) ? null : {hasUpperCase: true};
  }
}
