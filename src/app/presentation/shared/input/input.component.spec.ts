import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
	let component: InputComponent;
	let fixture: ComponentFixture<InputComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [InputComponent]
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(InputComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be show error required field', () => {
		const elementDebug = fixture.debugElement.query(By.css('div'));
		elementDebug.triggerEventHandler('click', null);

		const element = fixture.debugElement.query(By.css('div'))
			.nativeElement as HTMLDivElement;
		expect(element.textContent).toEqual('Field is required');
	});

	it('should be show error email invalid', () => {
		const element = fixture.debugElement.query(By.css('div'))
			.nativeElement as HTMLDivElement;
		expect(element.textContent).toEqual('Email invalid');
	});

	it('should be show error password invalid', () => {
		const element = fixture.debugElement.query(By.css('div'))
			.nativeElement as HTMLDivElement;
		expect(element.textContent).toEqual('Password invalid');
	});

	it('should be not show error messages for email', () => {
		const element = fixture.debugElement.query(By.css('div'))
			.nativeElement as HTMLDivElement;
		expect(element.textContent).toEqual('');
	});

	it('should be not show error messages for password', () => {
		const element = fixture.debugElement.query(By.css('div'))
			.nativeElement as HTMLDivElement;
		expect(element.textContent).toEqual('');
	});
});
