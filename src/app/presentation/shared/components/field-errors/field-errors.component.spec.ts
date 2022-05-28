import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { FieldErrorsComponent } from './field-errors.component';

describe('FieldErrorsComponent', () => {
	let component: FieldErrorsComponent;
	let fixture: ComponentFixture<FieldErrorsComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [FieldErrorsComponent]
		}).compileComponents();
		fixture = TestBed.createComponent(FieldErrorsComponent);
		component = fixture.componentInstance;
		component.formControl = new FormControl('');
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
