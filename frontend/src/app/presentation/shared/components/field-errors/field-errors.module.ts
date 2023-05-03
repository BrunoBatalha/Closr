import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FieldErrorsComponent } from './field-errors.component';

@NgModule({
	declarations: [FieldErrorsComponent],
	imports: [CommonModule],
	exports: [FieldErrorsComponent]
})
export class FieldErrorsModule {}
