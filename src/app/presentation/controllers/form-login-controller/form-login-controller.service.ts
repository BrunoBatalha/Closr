import { Injectable } from '@angular/core';
import { concatMap, Observable, of } from 'rxjs';
import { GenericFormGroup } from 'src/app/core/interfaces/forms/GenericFormGroup';
import { LoginFields } from 'src/app/core/interfaces/forms/LoginFields';
import { LoginResponse } from 'src/app/core/interfaces/responses/LoginResponse';
import { LoginUsecaseService } from 'src/app/core/useCases/user/login-usecase/login-usecase.service';

@Injectable({
	providedIn: 'root'
})
export class FormLoginControllerService {
	constructor(private readonly loginUseCase: LoginUsecaseService) {}

	submit(form: GenericFormGroup<LoginFields>): Observable<LoginResponse> {
		const fields: LoginFields = {
			email: form.controls.email.value,
			password: form.controls.password.value
		};

		return this.loginUseCase.execute(fields).pipe(
			concatMap((response: LoginResponse) => {
				localStorage.setItem('token', response.token);
				return of(response);
			})
		);
	}
}
