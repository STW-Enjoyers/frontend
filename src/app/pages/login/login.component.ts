import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

import * as LoginConstants from './login.constants'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  title:string = LoginConstants.TITLE;
  emailLabel:string = LoginConstants.EMAIL_LABEL;
  emailPlaceholder:string = LoginConstants.EMAIL_PLACEHOLDER;
  passwordLabel:string = LoginConstants.PASSWORD_LABEL;
  passwordPlaceholder:string = LoginConstants.PASSWORD_PLACEHOLDER;
  submitButton:string = LoginConstants.SUBMIT_BUTTON;
  registerMessage:string = LoginConstants.REGISTER_MESSAGE;
  registeRedirect: string = LoginConstants.REGISTER_REDIRECT;
  emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  model = {
    email: '',
    password: '',
  };

  constructor(public userService: UserService, public router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.userService.login(form.value).subscribe(
      (res: any) => {
        console.log('Sin problema man');
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/ajustes-usuario');
      },
      //(err) => {}
    );
  }
}
