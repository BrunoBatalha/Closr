import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

@Component({
	selector: 'app-input',
	templateUrl: './input.component.html',
	styleUrls: ['./input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: InputComponent
		}
	]
})
export class InputComponent implements ControlValueAccessor, OnInit {
	@Input() parentFormGroup!: FormGroup;
	@Input() fieldName!: string;
	@Input() placeholder!: string;
	@Input() type?: string;
	@Input() autofocus: boolean = false;
	errors: string[] = [];
	control: AbstractControl | undefined;
	value!: string;
	initialType?: string;
	iconPassword = faEyeSlash;
	disabled: boolean = false;

	get formControl(): FormControl {
		return this.parentFormGroup.get(this.fieldName) as FormControl;
	}

	onChanged!: (_: string) => void;
	onTouched!: () => void;

	ngOnInit(): void {
		this.initialType = this.type;
	}

	changedValue(event: Event): void {
		console.log(this.formControl.errors);
		if (this.onChanged) {
			this.onChanged((event.target as HTMLInputElement).value);
			this.errors = Object.keys(this.formControl.errors || {});
		}
	}

	togglePassword(): void {
		if (this.type === 'password') {
			this.type = 'text';
			this.iconPassword = faEye;
		} else {
			this.type = 'password';
			this.iconPassword = faEyeSlash;
		}
	}

	writeValue(newValue: any): void {
		this.value = newValue;
	}

	registerOnChange(onChanged: any): void {
		this.onChanged = onChanged;
	}

	registerOnTouched(onTouched: any): void {
		this.onTouched = onTouched;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
