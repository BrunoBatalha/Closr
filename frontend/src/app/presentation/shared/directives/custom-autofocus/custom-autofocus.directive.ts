import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
	selector: '[appCustomAutofocus]'
})
export class CustomAutofocusDirective implements OnInit {
	@Input() appCustomAutofocus: boolean | undefined;

	constructor(private el: ElementRef) {}

	ngOnInit(): void {
		if (this.appCustomAutofocus) {
			setTimeout(() => {
				this.el.nativeElement.focus();
			}, 500);
		}
	}
}
