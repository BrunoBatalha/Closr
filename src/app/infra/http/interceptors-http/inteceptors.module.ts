import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthRequestHttpInterceptor } from './interceptors-request-http/auth-request-http.interceptor';

@NgModule({
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthRequestHttpInterceptor,
			multi: true
		}
	]
})
export class InterceptorsModule {}
