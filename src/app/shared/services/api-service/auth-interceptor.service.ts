import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { ConfigService } from '../config.service';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private _Injector: Injector, private _CookieService: CookieService, 
        private _ConfigService: ConfigService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const token = this._CookieService.get('_t_')
        // console.log(token);
        const token=localStorage.getItem('_t_')
        // const token = CryptoJS.AES.decrypt(encToken, 'myastroguruji').toString()
        // console.log(token, 321);

        if (token !== null) {
            const headers = req.headers.set('Authorization', `Bearer ${token}`);
            const authReq = req.clone({ headers });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }

    }
}