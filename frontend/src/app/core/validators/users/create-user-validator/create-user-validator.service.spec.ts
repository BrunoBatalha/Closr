import { TestBed } from '@angular/core/testing';

import { CreateUserValidatorService } from './create-user-validator.service';

describe('CreateUserValidatorService', () => {
	let service: CreateUserValidatorService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CreateUserValidatorService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
