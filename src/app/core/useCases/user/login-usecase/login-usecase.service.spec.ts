/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LoginUsecaseService } from './login-usecase.service';

describe('Service: LoginUsecase', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [LoginUsecaseService]
		});
	});

	it('should ...', inject([LoginUsecaseService], (service: LoginUsecaseService) => {
		expect(service).toBeTruthy();
	}));
});
