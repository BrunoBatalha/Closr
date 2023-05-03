import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
	let component: ButtonComponent;
	let fixture: ComponentFixture<ButtonComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [ButtonComponent]
		}).compileComponents();
		fixture = TestBed.createComponent(ButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should be disabled', () => {
		component.disabled = true;
		fixture.detectChanges();

		expect(fixture.debugElement.query(By.css('button')).attributes['disabled']).toEqual('');
	});
});
