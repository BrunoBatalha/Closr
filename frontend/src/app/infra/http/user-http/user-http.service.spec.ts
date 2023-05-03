/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserHttpService } from './user-http.service';

describe('Service: UserHttp', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [UserHttpService]
		});
	});

	it('should ...', inject([UserHttpService], (service: UserHttpService) => {
		expect(service).toBeTruthy();
	}));
});
