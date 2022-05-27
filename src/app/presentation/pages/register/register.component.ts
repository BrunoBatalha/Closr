import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericFormGroup } from 'src/app/core/interfaces/forms/GenericFormGroup';
import { RegisterFields } from 'src/app/core/interfaces/forms/RegisterFields';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	reactiveForm: GenericFormGroup<RegisterFields> = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.minLength(5)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(8)]),
		confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)])
	}) as GenericFormGroup<RegisterFields>;

	onSubmit(): void {
		console.log('--------------START-SUBMIT--------------');
		console.log(this.reactiveForm.controls.email.value);
		console.log(this.reactiveForm.controls.email.errors);
		console.log('--------------END-SUBMIT--------------');
	}
}
