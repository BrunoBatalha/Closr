import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private readonly authService: AuthService, private router: Router) {}

	canActivate(
		_route: ActivatedRouteSnapshot,
		_state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const refreshToken = this.authService.getRefreshToken();
		const token = this.authService.getAuthorizationToken();
		const userId = this.authService.getUserId();

		if (refreshToken && token && userId) {
			return true;
		} else {
			return this.router.parseUrl('/');
		}
	}
}
