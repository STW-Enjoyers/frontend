/***************************************
 * file: login.component.ts
 * coms: Implements a reactive login form.
 ***************************************/
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { FormValidatorService} from "../../services/form-validator.service";

import * as LoginConstants from './login.constants'
import {REDIRECT_MESSAGE} from "../registro/registro.constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  // Constants
  title:string = LoginConstants.TITLE;
  emailLabel:string = LoginConstants.EMAIL_LABEL;
  emailPlaceholder:string = LoginConstants.EMAIL_PLACEHOLDER;
  passwordLabel:string = LoginConstants.PASSWORD_LABEL;
  passwordPlaceholder:string = LoginConstants.PASSWORD_PLACEHOLDER;
  submitButton:string = LoginConstants.SUBMIT_BUTTON;
  redirectMessage:string = LoginConstants.REDIRECT_MESSAGE;
  redirectButton: string = LoginConstants.REDIRECT_BUTTON;
  // Form
  loginForm!: FormGroup;
  // Input error messages
  formErrors = { Email: undefined, Password: undefined };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public router: Router,
    private validator: FormValidatorService
    ) {}

  ngOnInit(): void {
    // Init form validators
    this.loginForm = this.fb.group({
        Email: ['', [Validators.required, Validators.pattern(this.validator.regex.email)]],
        Password: ['', [Validators.required]],
      });
    // Subscribe on value change
    this.loginForm.valueChanges.subscribe(
      value => {
        this.updateValidationErrors()
      }
    );
  }

  // Get errors and update form
  updateValidationErrors() {
    this.formErrors = this.validator.getValidationErrors(this.loginForm, LoginConstants.VALIDATION_MESSAGES);
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.updateValidationErrors();
      return;
    }

    this.userService.login(this.loginForm.value).subscribe(
      (res: any) => {
        console.log('Sin problema man');
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/ajustes-usuario');
      },
      //(err) => {}
    );
  }
}
