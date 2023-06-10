import {Directive} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appHasNumeric]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: HasNumericDirective,
    multi: true
  }]
})
export class HasNumericDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return /[0-9]+/.test(value) ? null : {hasNumeric: true};
  }

}
