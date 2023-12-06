import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfigService } from '../config.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  apiRoot: string;
  constructor(
    private _HttpClient: HttpClient,
    private _ConfigService: ConfigService
  ) {
    this.apiRoot = `${this._ConfigService.config['api']?.commonApiRoot}`;
  }

  postRequest<T>(url: string, body?: any, options?: IRequestOptions): Promise<T> {
    const apiRoot = (options && options.apiRoot) ? options.apiRoot : this.apiRoot;
    const headers = (options && options.headers) ? options.headers : new HttpHeaders();
    return firstValueFrom(this._HttpClient.post(apiRoot + url, body, { headers }))
      .then(res => res as T)
      .catch(err => this.handleCatchError<T>(err));
  }

  getRequest<T>(url: string, options?: IRequestOptions): Promise<T> {
    const apiRoot = (options && options.apiRoot) ? options.apiRoot : this.apiRoot;
    const headers = (options && options.headers) ? options.headers : new HttpHeaders();
    return firstValueFrom(this._HttpClient.get(apiRoot + url, { headers }))
      .then(res => res as T)
      .catch(err => this.handleCatchError<T>(err));
  }

  putRequest<T>(url: string, body: any, options?: IRequestOptions): Promise<T> {
    const apiRoot = (options && options.apiRoot) ? options.apiRoot : this.apiRoot;
    const headers = (options && options.headers) ? options.headers : new HttpHeaders();
    return firstValueFrom(this._HttpClient.put(apiRoot + url, body, { headers }))
      .then(res => res as T)
      .catch(err => this.handleCatchError<T>(err));
  }

  deleteRequest<T>(url: string, options?: IRequestOptions): Promise<T> {
    const apiRoot = (options && options.apiRoot) ? options.apiRoot : this.apiRoot;
    const headers = (options && options.headers) ? options.headers : new HttpHeaders();
    return firstValueFrom(this._HttpClient.delete(apiRoot + url, { headers }))
      .then(res => res as T)
      .catch(err => this.handleCatchError<T>(err));
  }

  // handle errors
  private handleCatchError<T>(err: HttpErrorResponse) {
    if (!environment.production) {
      if ((err.status === 404) || (err.status === 0 && err.url === null)) {
        // tslint:disable-next-line: no-console
        console.log('HttpError', 'Server not available');
      }
      if ((err.status === 401)) {
        // tslint:disable-next-line: no-console
        console.log('HttpError', 'Unauthorized');
      }
      if (err.status !== 0 && err.status !== 200 && err.status !== 401 && err.status !== 404) {
        // tslint:disable-next-line: no-console
        console.log('HttpError', 'Server Error');
      }
    }
    return {} as T;
  }
}

interface IRequestOptions {
  headers?: HttpHeaders;
  apiRoot?: string;
}
