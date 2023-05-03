import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/core/interfaces/ErrorMessage';
import { GenericFormGroup } from 'src/app/core/interfaces/forms/GenericFormGroup';
import { LoginFields } from 'src/app/core/interfaces/forms/LoginFields';
import { SnackBarService } from 'src/app/infra/services/snack-bar-service/snack-bar.service';
import { FormLoginControllerService } from '../../controllers/form-login-controller/form-login-controller.service';

@Component({
	selector: 'app-login',
	templateUrl: './form-login.component.html',
	styleUrls: []
})
export class FormLoginComponent implements OnDestroy {
	reactiveForm: GenericFormGroup<LoginFields> = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required])
	}) as GenericFormGroup<LoginFields>;

	private submit$?: Subscription;

	constructor(
		private formLoginControllerService: FormLoginControllerService,
		private router: Router,
		private readonly snackbarService: SnackBarService
	) {}

	onSubmit(): void {
		this.reactiveForm.disable();

		this.submit$ = this.formLoginControllerService.submit(this.reactiveForm).subscribe({
			next: () => {
				this.router.navigate(['home']);
			},
			error: (error: ErrorMessage[]) => {
				this.snackbarService.show(error[0].message, 'danger');
				this.reactiveForm.enable();
			},
			complete: () => {
				this.reactiveForm.enable();
			}
		});
	}

	ngOnDestroy(): void {
		this.submit$?.unsubscribe();
	}
}
