import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/input/input.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
	declarations: [RegisterComponent, InputComponent],
	imports: [CommonModule, RegisterRoutingModule, ReactiveFormsModule],
})
export class RegisterModule {}
