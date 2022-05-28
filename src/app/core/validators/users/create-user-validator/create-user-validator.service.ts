import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterFields } from 'src/app/core/interfaces/forms/RegisterFields';

@Injectable({
	providedIn: 'root'
})
export class CreateUserValidatorService {
	validate(fields: RegisterFields): Observable<void> {
		return new Observable((subscriber) => {
			console.log('validando...');
			setTimeout(() => {
				if (fields.password === fields.confirmPassword) {
					subscriber.next();
				} else {
					subscriber.error();
				}
				subscriber.complete();
			}, 3000);
		});
	}
}
