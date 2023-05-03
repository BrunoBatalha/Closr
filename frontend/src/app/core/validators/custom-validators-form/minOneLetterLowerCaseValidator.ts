import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minOneLetterLowerCaseValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const hasLowerCase = /(?=.*[a-z])/.test(control.value);
		return hasLowerCase ? null : { minOneLetterLowerCase: { value: control.value } };
	};
}
