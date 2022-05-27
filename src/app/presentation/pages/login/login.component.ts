import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GenericFormGroup } from 'src/app/core/interfaces/forms/GenericFormGroup';
import { LoginFields } from 'src/app/core/interfaces/forms/LoginFields';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	reactiveForm: GenericFormGroup<LoginFields> = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required])
	}) as GenericFormGroup<LoginFields>;
}
