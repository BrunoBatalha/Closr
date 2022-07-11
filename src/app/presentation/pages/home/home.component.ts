import { Component, OnInit } from '@angular/core';
import { GetUserResponse } from 'src/app/core/interfaces/responses/GetUserResponse';
import { UserHttpService } from 'src/app/infra/http/user-http/user-http.service';
import { AuthService } from 'src/app/infra/services/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	user?: GetUserResponse;

	constructor(private readonly userHttpService: UserHttpService, private readonly authService: AuthService) {}

	ngOnInit(): void {
		this.loadUser();
	}

	refresh(): void {
		location.reload();
	}

	private loadUser(): void {
		const userId = this.authService.getUserId();
		if (userId) {
			this.userHttpService.getUser({ id: userId }).subscribe({
				next: (value) => {
					this.user = value;
				}
			});
		}
	}
}
