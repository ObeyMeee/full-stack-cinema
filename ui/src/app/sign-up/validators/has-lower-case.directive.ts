import { Directive } from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator} from "@angular/forms";

@Directive({
  selector: '[appHasLowerCase]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: HasLowerCaseDirective,
    multi: true
  }]
})

export class HasLowerCaseDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    return /[a-z]+/.test(value) ? null : {hasLowerCase: true};
  }

}
