/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormLoginControllerService } from './form-login-controller.service';

describe('Service: FormLoginController', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FormLoginControllerService]
		});
	});

	it('should ...', inject([FormLoginControllerService], (service: FormLoginControllerService) => {
		expect(service).toBeTruthy();
	}));
});
