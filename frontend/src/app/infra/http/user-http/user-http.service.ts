import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserRequest } from 'src/app/core/interfaces/requests/CreateUserRequest';
import { GetUserRequest } from 'src/app/core/interfaces/requests/GetUserRequest';
import { CreateUserResponse } from 'src/app/core/interfaces/responses/CreateUserResponse';
import { GetUserResponse } from 'src/app/core/interfaces/responses/GetUserResponse';
import { HttpBaseService } from '../http-base.service';

@Injectable({
	providedIn: 'root'
})
export class UserHttpService extends HttpBaseService {
	create(request: CreateUserRequest): Observable<CreateUserResponse> {
		return this.post<CreateUserResponse>('users', request);
	}

	getUser(request: GetUserRequest): Observable<GetUserResponse> {
		return this.get<GetUserResponse>(`users/${request.id}`);
	}
}
