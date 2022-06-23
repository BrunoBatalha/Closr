/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SnackBarService } from './snack-bar.service';

describe('Service: SnackBar', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [SnackBarService]
		});
	});

	it('should ...', inject([SnackBarService], (service: SnackBarService) => {
		expect(service).toBeTruthy();
	}));
});
