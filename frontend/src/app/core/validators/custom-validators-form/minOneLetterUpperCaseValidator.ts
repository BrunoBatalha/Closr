import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minOneLetterUpperCaseValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const hasUpperCase = /(?=.*[A-Z])/.test(control.value);
		return hasUpperCase ? null : { minOneLetterUpperCase: { value: control.value } };
	};
}
