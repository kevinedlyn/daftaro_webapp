import { AbstractControl } from '@angular/forms';

import { Setting } from '../util/settings';

export function PasswordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const repeat = control.get('repeat_password');
    
    return password && repeat && password.value !== repeat.value ? { 'passwordMissmatch' : true } : null;
}
