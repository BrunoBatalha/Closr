import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '../../shared/components/button/button.module';
import { InputModule } from '../../shared/components/input/input.module';
import { FormRegisterComponent } from './form-register.component';

const routes: Routes = [{ path: '', component: FormRegisterComponent }];

@NgModule({
	declarations: [FormRegisterComponent],
	imports: [CommonModule, ReactiveFormsModule, InputModule, ButtonModule, RouterModule.forChild(routes)]
})
export class RegisterModule {}
