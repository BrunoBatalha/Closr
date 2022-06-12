import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

type Params = HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> };
type Header = HttpHeaders | { [header: string]: string | string[] };

@Injectable({
	providedIn: 'root'
})
export class HttpBaseService {
	private baseUrl = environment.url.apiV1 + '/api/v1';

	protected constructor(private http: HttpClient) {}

	protected post<TResponse>(path: string, body: object, header?: Header, params?: Params): Observable<TResponse> {
		return this.http.post<TResponse>(`${this.baseUrl}/${path}`, body, {
			headers: header,
			params: params
		});
	}
}
