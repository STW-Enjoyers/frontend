/***********************************************************
 * file: auth.interceptor.ts
 * coms: Intercept all HttpRequest.
 * If request doesn't have a  'noauth' header, it inserts a JWT on the Bearer token header
 **********************************************************/
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public userService: UserService, public router: Router) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.headers.get('noauth') && console.log('NOAUTH')) {
      return next.handle(req.clone());
    }else {
      //console.log('AUTH Bearer ' + this.userService.getToken());
      const clonereq = req.clone({
        headers: req.headers.set(
          'Authorization',
          'Bearer ' + this.userService.getToken()
        ),
      });
      return next.handle(clonereq);
    }
  }
}
