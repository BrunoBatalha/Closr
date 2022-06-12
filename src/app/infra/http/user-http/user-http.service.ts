import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserRequest } from 'src/app/core/interfaces/requests/CreateUserRequest';
import { CreateUserResponse } from 'src/app/core/interfaces/responses/CreateUserResponse';
import { HttpBaseService } from '../http-base.service';

@Injectable({
	providedIn: 'root'
})
export class UserHttpService extends HttpBaseService {
	create(body: CreateUserRequest): Observable<CreateUserResponse> {
		return this.post<CreateUserResponse>('users', body);
	}
}
