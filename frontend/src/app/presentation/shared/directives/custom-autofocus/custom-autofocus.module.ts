import { NgModule } from '@angular/core';
import { CustomAutofocusDirective } from './custom-autofocus.directive';

@NgModule({
	declarations: [CustomAutofocusDirective],
	exports: [CustomAutofocusDirective]
})
export class CustomAutofocusModule {}
