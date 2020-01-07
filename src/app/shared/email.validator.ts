import { AbstractControl } from '@angular/forms';

export function EmailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const email = control.get('email');
    const confirmEmail = control.get('confirmEmail');
    if (email.pristine || confirmEmail.pristine) {
      return null;
    }
    return email && confirmEmail && email.value !== confirmEmail.value ? { 'emailMissMatch': true } : null;
  }
  