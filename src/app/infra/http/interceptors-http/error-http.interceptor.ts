import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ErrorHttpInterceptor implements HttpInterceptor {
	constructor(private readonly router: Router) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			tap({
				error: (error: HttpErrorResponse) => {
					if (error.status === 0) {
						this.router.navigate(['/']);
					}
				}
			})
		);
	}
}
