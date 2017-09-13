import { Directive } from '@angular/core';
import { AbstractControl,
         NG_VALIDATORS,
         Validator,
         ValidationErrors } from '@angular/forms';

export function notBlankValidator(control: AbstractControl) {
  if (!control.value) return null; // leave to "required"

  if (control.value.trim().length === 0) {
    return {'notblank': true};
  } else {
    return null;
  }
}

@Directive({
  selector: '[notblank]',
  providers: [{provide: NG_VALIDATORS, useExisting: NotBlankValidatorDirective, multi: true}]
})
export class NotBlankValidatorDirective implements Validator {
  validate(control: AbstractControl): {[key: string]: any} {
    return notBlankValidator(control);
  }
}
