import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GenericFormGroup } from 'src/app/core/interfaces/forms/GenericFormGroup';
import { RegisterFields } from 'src/app/core/interfaces/forms/RegisterFields';
import { CustomValidator } from 'src/app/core/validators/custom-validators-form';
import { FormRegisterControllerService } from '../../controllers/form-register-controller/form-register-controller.service';

@Component({
	selector: 'app-register',
	templateUrl: './form-register.component.html',
	styleUrls: ['./form-register.component.scss']
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

	constructor(private formRegisterControllerService: FormRegisterControllerService) {}

	onSubmit(): void {
		this.reactiveForm.disable();

		this.submit$ = this.formRegisterControllerService.submit(this.reactiveForm).subscribe({
			next: () => {
				console.log('sucesso');
			},
			error: () => {
				console.log('erro');
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
// controller na real aq eh o facade,
/**exemplo uma tela pode fazer varias coisas, pelo controller eh decidido qual usecase vai ser utilizado
 * controller atua como uma interface para os usecases, um controller pode ter varias instacias de usecases
 * mas a tela vai ter apenas um controller
 */
