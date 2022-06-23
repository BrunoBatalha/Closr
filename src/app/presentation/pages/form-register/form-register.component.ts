import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/core/interfaces/ErrorMessage';
import { GenericFormGroup } from 'src/app/core/interfaces/forms/GenericFormGroup';
import { RegisterFields } from 'src/app/core/interfaces/forms/RegisterFields';
import { CustomValidator } from 'src/app/core/validators/custom-validators-form';
import { SnackBarService } from 'src/app/infra/services/snack-bar-service/snack-bar.service';
import { FormRegisterControllerService } from '../../controllers/form-register-controller/form-register-controller.service';

@Component({
	selector: 'app-register',
	templateUrl: './form-register.component.html',
	styleUrls: []
})
export class FormRegisterComponent implements OnDestroy {
	private readonly passwordValidatorCommons = [
		Validators.required,
		Validators.minLength(8),
		CustomValidator.minOneLetterUpperCaseValidator(),
		CustomValidator.minOneLetterLowerCaseValidator(),
		CustomValidator.needsNumberValidator()
	];

	reactiveForm: GenericFormGroup<RegisterFields> = new FormGroup({
		username: new FormControl('', [Validators.required, Validators.minLength(5)]),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', this.passwordValidatorCommons),
		confirmPassword: new FormControl('', this.passwordValidatorCommons)
	}) as GenericFormGroup<RegisterFields>;

	private submit$?: Subscription;

	constructor(
		private formRegisterControllerService: FormRegisterControllerService,
		private readonly snackbarService: SnackBarService
	) {}

	onSubmit(): void {
		this.reactiveForm.disable();

		this.submit$ = this.formRegisterControllerService.submit(this.reactiveForm).subscribe({
			next: () => {
				alert('sucesso');
			},
			error: (error: ErrorMessage[]) => {
				this.snackbarService.show(error[0].message);
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
