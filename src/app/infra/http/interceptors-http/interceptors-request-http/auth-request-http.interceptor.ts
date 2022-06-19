import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
	HttpStatusCode
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthRequestHttpInterceptor implements HttpInterceptor {
	constructor(private readonly authService: AuthService, private readonly router: Router) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const authToken = this.authService.getAuthorizationToken();
		const refreshtoken = this.authService.getRefreshToken();
		let reqCloned = req.clone();

		if (authToken && refreshtoken) {
			reqCloned = req.clone({
				headers: req.headers.set('Authorization', `Bearer ${authToken}`).set('Refresh-Token', refreshtoken)
			});
		}

		return next.handle(reqCloned).pipe(
			tap({
				next: (httpEvent) => {
					if (httpEvent instanceof HttpResponse) {
						this.saveToken(httpEvent);
						this.saveRefreshToken(httpEvent);
					}
				},
				error: (error: HttpErrorResponse) => {
					if (error.status === HttpStatusCode.Unauthorized) {
						this.router.navigate(['/']);
					}
				}
			})
		);
	}

	private saveRefreshToken(httpEvent: HttpResponse<any>): void {
		const refreshToken = httpEvent.headers.get('Refresh-Token');
		if (refreshToken) {
			this.authService.setRefreshToken(refreshToken);
		}
	}

	private saveToken(httpEvent: HttpResponse<any>): void {
		const token = httpEvent.headers.get('Authorization')?.split(' ')[1];
		if (token) {
			this.authService.setAuthorizationToken(token);
		}
	}
}
