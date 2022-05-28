import { TestBed } from '@angular/core/testing';
import { FormRegisterControllerService } from './form-register-controller.service';

describe('FormRegisterControllerService', () => {
	let service: FormRegisterControllerService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(FormRegisterControllerService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
