import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WrapperLoginRegisterComponent } from './wrapper-login-register.component';

const routes: Routes = [
	{
		path: '',
		component: WrapperLoginRegisterComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('src/app/presentation/pages/login/login.module').then((m) => m.LoginModule),
			},
			{
				path: 'register',
				loadChildren: () => import('src/app/presentation/pages/register/register.module').then((m) => m.RegisterModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class WrapperLoginRegisterRoutingModule {}
