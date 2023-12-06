import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperAdminModule } from './super-admin/super-admin.module';
import { AuthModule } from './auth/auth.module';
import { Observable, ObservableInput, catchError, map, of as observableOf } from 'rxjs';
import { ConfigService } from './shared/services/config.service';
import { AuthInterceptorService } from './shared/services/api-service/auth-interceptor.service';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOtpInputModule } from 'ng-otp-input';
import { SpinnerComponentComponent } from './shared/components/spinner-component/spinner-component.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

const load = (_HttpClient: HttpClient, _ConfigService: ConfigService): (() => Promise<boolean>) => {
  return (): Promise<boolean> => {
    return new Promise<boolean>((resolve: (value: boolean) => void) => {
      _HttpClient.get('../assets/config.json').pipe(
        map((val) => {
          _ConfigService.config = val;
          resolve(true);
        }),
        catchError((_err, _caught: Observable<void>): ObservableInput<{}> => {
          resolve(false);
          return observableOf({});
        })
      ).subscribe();
    });
  };
};

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SpinnerComponentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SuperAdminModule,
    RouterModule,
    AuthModule,
    BrowserAnimationsModule,
    NgSelectModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),

  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: load,
    deps: [
      HttpClient,
      ConfigService
    ],
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },
    CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
