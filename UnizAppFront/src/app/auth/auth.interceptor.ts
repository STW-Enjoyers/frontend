import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public userService: UserService, public router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get('noauth')) return next.handle(req.clone());
    else {
      const clonereq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this.userService.getToken()
        ),
      });
      return next.handle(clonereq).pipe(
        tap(
          (event) => {},
          (err) => {
            if (!err.error.auth) this.router.navigateByUrl('/login');
          }
        )
      );
    }
  }
}
