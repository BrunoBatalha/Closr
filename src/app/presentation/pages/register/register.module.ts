import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '../../shared/components/button/button.module';
import { InputModule } from '../../shared/components/input/input.module';
import { RegisterComponent } from './register.component';

const routes: Routes = [{ path: '', component: RegisterComponent }];

@NgModule({
	declarations: [RegisterComponent],
	imports: [CommonModule, ReactiveFormsModule, InputModule, ButtonModule, RouterModule.forChild(routes)]
})
export class RegisterModule {}
