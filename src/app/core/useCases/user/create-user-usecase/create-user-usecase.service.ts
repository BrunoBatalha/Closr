import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterFields } from 'src/app/core/interfaces/forms/RegisterFields';
import { CreateUserValidatorService } from 'src/app/core/validators/users/create-user-validator/create-user-validator.service';

@Injectable({
	providedIn: 'root'
})
export class CreateUserUsecaseService {
	constructor(private readonly validator: CreateUserValidatorService) {}

	execute(fields: RegisterFields): Observable<void> {
		return this.validator.validate(fields);
	}
}
