import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function needsNumberValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const hasNumber = /(?=.*[0-9])/.test(control.value);
		return hasNumber ? null : { needsNumber: { value: control.value } };
	};
}
