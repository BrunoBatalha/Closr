import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ErrorMessage } from 'src/app/core/interfaces/ErrorMessage';
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
		return this.request('post', path, body, header, params);
	}

	protected get<TResponse>(path: string, header?: Header, params?: Params): Observable<TResponse> {
		return this.request('get', path, undefined, header, params);
	}

	private request<TResponse>(
		methodHttp: 'get' | 'post',
		path: string,
		body?: object,
		header?: Header,
		params?: Params
	): Observable<TResponse> {
		let httpRequest$: Observable<TResponse> | null = null;

		if (methodHttp === 'get') {
			httpRequest$ = this.http.get<TResponse>(`${this.baseUrl}/${path}`, {
				headers: header,
				params: params
			});
		} else if (methodHttp === 'post') {
			httpRequest$ = this.http.post<TResponse>(`${this.baseUrl}/${path}`, body, {
				headers: header,
				params: params
			});
		}

		if (!httpRequest$) {
			throw new Error('Http method not found');
		}

		return httpRequest$.pipe(
			catchError((e: HttpErrorResponse) => {
				if (e.status === 0) {
					throw [{ code: '0', message: e.message }] as ErrorMessage[];
				} else {
					throw e.error as ErrorMessage[];
				}
			})
		);
	}
}
