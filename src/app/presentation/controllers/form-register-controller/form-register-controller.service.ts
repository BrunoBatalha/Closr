import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericFormGroup } from 'src/app/core/interfaces/forms/GenericFormGroup';
import { RegisterFields } from 'src/app/core/interfaces/forms/RegisterFields';
import { CreateUserResponse } from 'src/app/core/interfaces/requests/CreateUserResponse';
import { CreateUserUsecaseService } from 'src/app/core/useCases/user/create-user-usecase/create-user-usecase.service';

@Injectable({
	providedIn: 'root'
})
export class FormRegisterControllerService {
	constructor(private readonly createUserUseCase: CreateUserUsecaseService) {}

	submit(form: GenericFormGroup<RegisterFields>): Observable<CreateUserResponse> {
		const fields: RegisterFields = {
			username: form.controls.username.value,
			email: form.controls.email.value,
			password: form.controls.password.value,
			confirmPassword: form.controls.confirmPassword.value
		};

		return this.createUserUseCase.execute(fields);
	}
}
