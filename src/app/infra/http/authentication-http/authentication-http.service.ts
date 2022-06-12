import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/core/interfaces/requests/LoginRequest';
import { LoginResponse } from 'src/app/core/interfaces/responses/LoginResponse';
import { HttpBaseService } from '../http-base.service';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationHttpService extends HttpBaseService {
	login(body: LoginRequest): Observable<LoginResponse> {
		return this.post('login', body);
	}
}
