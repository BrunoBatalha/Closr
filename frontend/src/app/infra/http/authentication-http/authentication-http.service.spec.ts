/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthenticationHttpService } from './authentication-http.service';

describe('Service: AuthenticationHttp', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AuthenticationHttpService]
		});
	});

	it('should ...', inject([AuthenticationHttpService], (service: AuthenticationHttpService) => {
		expect(service).toBeTruthy();
	}));
});
