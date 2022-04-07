import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpRequest, HttpHandler,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(public router: Router) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
      retry(1),
      // @ts-ignore
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            // Unauthorized error
            this.router.navigateByUrl('/login'); break;
          default:
            // All errors will be catched by global-error-handler.ts,
            // will be notified by notification.service.ts and loggging.service.ts
            return throwError(error);
        }
      })
    );
  }
}
