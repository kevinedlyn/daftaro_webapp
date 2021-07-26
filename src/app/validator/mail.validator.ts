import { AbstractControl } from '@angular/forms';

import { Setting } from '../util/settings';

export function EmailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return Setting.mailRegex.test(control.value) ? null : { 'emailInvalid' : true };
}