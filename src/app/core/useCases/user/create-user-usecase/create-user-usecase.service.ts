import { Injectable } from '@angular/core';
import { concatMap, Observable } from 'rxjs';
import { RegisterFields } from 'src/app/core/interfaces/forms/RegisterFields';
import { CreateUserResponse } from 'src/app/core/interfaces/requests/CreateUserResponse';
import { CreateUserValidatorService } from 'src/app/core/validators/users/create-user-validator/create-user-validator.service';
import { UserHttpService } from 'src/app/infra/http/user-http/user-http.service';

@Injectable({
	providedIn: 'root'
})
export class CreateUserUsecaseService {
	constructor(
		private readonly validator: CreateUserValidatorService,
		private readonly userHttpService: UserHttpService
	) {}

	execute(fields: RegisterFields): Observable<CreateUserResponse> {
		return this.validator.validate(fields).pipe(
			concatMap(() =>
				this.userHttpService.create({
					email: fields.username,
					password: fields.password,
					username: fields.username
				})
			)
		);
	}
}
