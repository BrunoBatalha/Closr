import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthHttpInterceptor } from './auth-http.interceptor';
import { ErrorHttpInterceptor } from './error-http.interceptor';

@NgModule({
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthHttpInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorHttpInterceptor,
			multi: true
		}
	]
})
export class InterceptorsModule {}
