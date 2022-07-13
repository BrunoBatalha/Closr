import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ErrorMessage } from 'src/app/core/interfaces/ErrorMessage';
import { RegisterFields } from 'src/app/core/interfaces/forms/RegisterFields';

@Injectable({
	providedIn: 'root'
})
export class CreateUserValidatorService {
	validate(fields: RegisterFields): Observable<void> {
		return new Observable((subscriber) => {
			if (fields.password === fields.confirmPassword) {
				subscriber.next();
			} else {
				const error: ErrorMessage = {
					code: '',
					message: 'Passwords do not match'
				};
				subscriber.error([error]);
			}
			subscriber.complete();
		});
	}
}
