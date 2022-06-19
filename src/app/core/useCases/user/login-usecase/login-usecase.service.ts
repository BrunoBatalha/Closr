import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { LoginFields } from 'src/app/core/interfaces/forms/LoginFields';
import { ErrorResponse } from 'src/app/core/interfaces/responses/ErrorResponse';
import { LoginResponse } from 'src/app/core/interfaces/responses/LoginResponse';
import { AuthenticationHttpService } from 'src/app/infra/http/authentication-http/authentication-http.service';
import { AuthService } from 'src/app/infra/services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class LoginUsecaseService {
	constructor(
		private readonly authenticationHttpService: AuthenticationHttpService,
		private readonly authService: AuthService
	) {}

	execute(fields: LoginFields): Observable<LoginResponse> {
		return this.authenticationHttpService
			.login({
				email: fields.email,
				password: fields.password
			})
			.pipe(
				tap({
					next: (value: LoginResponse) => {
						this.authService.setUserId(value.user.id);
					}
				}),
				catchError((error: ErrorResponse) => {
					throw error;
				})
			);
	}
}
