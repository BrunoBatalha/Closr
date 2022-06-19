import { Component, OnInit } from '@angular/core';
import { UserHttpService } from 'src/app/infra/http/user-http/user-http.service';
import { AuthService } from 'src/app/infra/services/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(private readonly userHttpService: UserHttpService, private readonly authService: AuthService) {}

	ngOnInit(): void {
		const userId = this.authService.getUserId();
		if (userId) {
			this.userHttpService.getUser({ id: userId }).subscribe({
				next(value) {
					console.log('home ', value);
				}
			});
		}
	}
}
