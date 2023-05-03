import { TestBed } from '@angular/core/testing';
import { CreateUserUsecaseService } from './create-user-usecase.service';

describe('CreateUserUsecaseService', () => {
	let service: CreateUserUsecaseService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(CreateUserUsecaseService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
