import { AbstractControl } from '@angular/forms';

import { Setting } from '../util/settings';

export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return Setting.passRegex.test(control.value) ? null : { 'passwordInvalid': true };
}