import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './infra/guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import('./presentation/wrappers/login-register/wrapper-login-register.module').then(
				(m) => m.WrapperLoginRegisterModule
			)
	},
	{
		path: 'home',
		loadChildren: () => import('./presentation/pages/home/home.module').then((m) => m.HomeModule),
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
