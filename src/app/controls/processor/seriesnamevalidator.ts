import { Validator, AbstractControl, ValidatorFn, NG_VALIDATORS } from '@angular/forms';
import { Input, Directive } from '@angular/core';

@Directive({
    selector: '[appForbiddenSeriesName]',
    providers: [{ provide: NG_VALIDATORS, useExisting: SeriesNameValidatorDirective, multi: true }]
  })
export class SeriesNameValidatorDirective implements Validator {
    @Input('appForbiddenName') forbiddenName: string;

    validate(control: AbstractControl): { [key: string]: any } | null {
        return this.forbiddenName ? this.forbiddenNameValidator(new RegExp(this.forbiddenName, 'i'))(control)
            : null;
    }

    forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const forbidden = nameRe.test(control.value);
            return forbidden ? { 'forbiddenName': { value: control.value } } : null;
        };
    }
}