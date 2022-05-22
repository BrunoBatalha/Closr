import { Component, OnInit } from '@angular/core';
import {
	FormControl,
	FormGroup,
	ValidatorFn,
	Validators
} from '@angular/forms';

interface FormFields {
	email: string;
	password: string;
	confirmPassword: string;
}

interface FieldsGroup extends FormGroup {
	value: FormFields;
	controls: {
		[key in keyof FormFields]: FormControl;
	};
}

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	private validatesCommons: ValidatorFn[] = [Validators.required];

	reactiveForm!: FieldsGroup;
	ngOnInit(): void {
		this.reactiveForm = new FormGroup({
			username: new FormControl('', [
				...this.validatesCommons,
				Validators.minLength(5)
			]),
			email: new FormControl('', [...this.validatesCommons, Validators.email]),
			password: new FormControl('', [...this.validatesCommons]),
			confirmPassword: new FormControl('', [...this.validatesCommons])
		}) as FieldsGroup;
	}

	onSubmit(): void {
		console.log('--------------START-SUBMIT--------------');
		console.log(this.reactiveForm.controls.email.value);
		console.log(this.reactiveForm.controls.email.errors);
		console.log('--------------END-SUBMIT--------------');
	}
}
