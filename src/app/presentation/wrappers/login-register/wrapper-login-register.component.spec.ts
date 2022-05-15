import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WrapperLoginRegisterComponent } from './wrapper-login-register.component';

describe('WrapperLoginRegisterComponent', () => {
	let component: WrapperLoginRegisterComponent;
	let fixture: ComponentFixture<WrapperLoginRegisterComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [WrapperLoginRegisterComponent],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(WrapperLoginRegisterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
