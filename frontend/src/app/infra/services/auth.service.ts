import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private readonly storageService: StorageService) {}

	getAuthorizationToken(): string | null {
		return this.storageService.getItemString('token');
	}

	getRefreshToken(): string | null {
		return this.storageService.getItemString('refreshToken');
	}

	setAuthorizationToken(token: string): void {
		return this.storageService.setItem('token', token);
	}

	setRefreshToken(refreshToken: string): void {
		return this.storageService.setItem('refreshToken', refreshToken);
	}

	setUserId(id: string): void {
		return this.storageService.setItem('userId', id);
	}
	getUserId(): string | null {
		return this.storageService.getItemString('userId');
	}
}
