import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	setItem<TObject>(key: string, object: TObject): void {
		if (typeof object === 'string') {
			localStorage.setItem(key, object);
		} else {
			localStorage.setItem(key, JSON.stringify(object));
		}
	}

	getItem<TObject>(key: string): TObject | null {
		const itemStr = localStorage.getItem(key);
		if (itemStr) {
			return JSON.parse(itemStr) as TObject;
		}

		return null;
	}

	getItemString(key: string): string | null {
		return localStorage.getItem(key);
	}
}
