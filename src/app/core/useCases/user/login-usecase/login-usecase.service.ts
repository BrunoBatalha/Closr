import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { LoginFields } from 'src/app/core/interfaces/forms/LoginFields';
import { ErrorResponse } from 'src/app/core/interfaces/responses/ErrorResponse';
import { LoginResponse } from 'src/app/core/interfaces/responses/LoginResponse';
import { AuthenticationHttpService } from 'src/app/infra/http/authentication-http/authentication-http.service';

@Injectable({
	providedIn: 'root'
})
export class LoginUsecaseService {
	constructor(private readonly authenticationHttpService: AuthenticationHttpService) {}

	execute(fields: LoginFields): Observable<LoginResponse> {
		return this.authenticationHttpService
			.login({
				email: fields.email,
				password: fields.password
			})
			.pipe(
				catchError((error: ErrorResponse) => {
					throw error;
				})
			);
	}
}
