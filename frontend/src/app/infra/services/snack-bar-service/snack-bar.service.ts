import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SnackBarService {
	show(content: string, color: 'success' | 'danger'): void {
		const div = document.createElement('div');

		div.classList.add('snackbar');
		div.classList.add('snackbar--show');
		div.classList.add(`snackbar--${color}`);

		div.append(content);
		document.querySelector('body')?.append(div);

		setTimeout(() => {
			div.classList.add('snackbar--hidden');
		}, 2000);

		setTimeout(() => {
			div.remove();
		}, 3000);
	}
}
