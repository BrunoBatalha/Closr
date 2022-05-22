import { Component, Input } from '@angular/core';
import {
	AbstractControl,
	ControlValueAccessor,
	FormControl,
	FormGroup,
	NG_VALUE_ACCESSOR
} from '@angular/forms';

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
export class InputComponent implements ControlValueAccessor {
	@Input() parentFormGroup!: FormGroup;
	@Input() fieldName!: string;
	@Input() placeholder!: string;
	@Input() autofocus: boolean = false;

	errors: string[] = [];
	control: AbstractControl | undefined;
	value!: string;
	get formControl(): FormControl {
		return this.parentFormGroup.get(this.fieldName) as FormControl;
	}

	onChanged!: (_: string) => void;
	onTouched!: () => void;
	onValidate!: () => void;

	changedValue(event: Event): void {
		this.onChanged((event.target as HTMLInputElement).value);
		this.errors = Object.keys(this.formControl.errors || {});
		console.log(this.formControl.errors);
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

	registerOnValidatorChange(onValidate: any): void {
		this.onValidate = onValidate;
	}
}
