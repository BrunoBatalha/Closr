import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CustomAutofocusModule } from '../directives/custom-autofocus/custom-autofocus.module';
import { FieldErrorsComponent } from '../field-errors/field-errors.component';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [InputComponent, FieldErrorsComponent],
			imports: [CustomAutofocusModule]
		});
		fixture = TestBed.createComponent(InputComponent);
		component = fixture.componentInstance;
		component.placeholder = '';
		component.parentFormGroup = new FormGroup({
			field: new FormControl('', [Validators.required, Validators.email])
		});
		component.fieldName = 'field';
		component.value = '';
		component.onChanged = (): null => null;
		component.onTouched = (): null => null;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be show error required field', () => {
		configureControlToUse('');
		fixture.detectChanges();

		expect(getErrorMessages()).toContain('Field is required.');
	});

	it('should be show error email invalid', () => {
		configureControlToUse('invalidEmail');
		fixture.detectChanges();

		expect(getErrorMessages()).toContain('Email is invalid');
	});

	it('should be show error password invalid', () => {
		configureControlToUse('.');
		fixture.detectChanges();

		expect(getErrorMessages()).toContain('Password is invalid');
	});

	it('should be not show error messages for email', () => {
		configureControlToUse('emailtest@test.com');
		fixture.detectChanges();

		const element = fixture.debugElement.query(By.css('div')).nativeElement as HTMLDivElement;
		expect(element.textContent).toEqual('');
	});

	it('should be not show error messages for password', () => {
		component.parentFormGroup.controls[component.fieldName].setValidators([Validators.required]);
		configureControlToUse('password');
		fixture.detectChanges();

		const element = fixture.debugElement.query(By.css('div')).nativeElement as HTMLDivElement;
		expect(element.textContent).toEqual('');
	});

	function getErrorMessages(): string | null {
		const element: HTMLElement = (fixture.debugElement.nativeElement as HTMLElement).querySelector(
			'app-field-errors'
		) as HTMLElement;
		return element.textContent;
	}

	function configureControlToUse(value: string): void {
		const control = component.parentFormGroup.controls[component.fieldName];
		control.setValue(value);
		control.markAsTouched();
		control.markAsDirty();
	}
});
