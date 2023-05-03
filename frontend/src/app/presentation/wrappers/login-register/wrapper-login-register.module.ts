import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WrapperLoginRegisterRoutingModule } from './wrapper-login-register-routing.module';
import { WrapperLoginRegisterComponent } from './wrapper-login-register.component';

@NgModule({
	declarations: [WrapperLoginRegisterComponent],
	imports: [CommonModule, WrapperLoginRegisterRoutingModule]
})
export class WrapperLoginRegisterModule {}
