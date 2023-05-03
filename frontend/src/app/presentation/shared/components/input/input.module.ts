import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CustomAutofocusModule } from '../../directives/custom-autofocus/custom-autofocus.module';
import { FieldErrorsModule } from '../field-errors/field-errors.module';
import { InputComponent } from './input.component';

@NgModule({
	declarations: [InputComponent],
	imports: [CommonModule, FieldErrorsModule, CustomAutofocusModule, FontAwesomeModule],
	exports: [InputComponent]
})
export class InputModule {}
