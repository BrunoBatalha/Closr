import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

interface FormFields {
	email: string;
	password: string;
	confirmPassword: string;
}

interface FieldsGroup extends FormGroup {
	value: FormFields;
	controls: {
		[key in keyof FormFields]: AbstractControl;
	};
}

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	private validatesCommons: ValidatorFn[] = [Validators.required];

	reactiveForm = new FormGroup({
		email: new FormControl('', [...this.validatesCommons]),
		password: new FormControl('', [...this.validatesCommons]),
		confirmPassword: new FormControl('', [...this.validatesCommons]),
	}) as FieldsGroup;

	onSubmit(): void {
		console.log(this.reactiveForm.controls.email.value);
		console.log(this.reactiveForm.controls.password.errors);
		console.log(this.reactiveForm);
	}
}
