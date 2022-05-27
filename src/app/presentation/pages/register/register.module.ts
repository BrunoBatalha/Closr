import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '../../shared/input/input.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

@NgModule({
	declarations: [RegisterComponent],
	imports: [CommonModule, RegisterRoutingModule, ReactiveFormsModule, InputModule]
})
export class RegisterModule {}