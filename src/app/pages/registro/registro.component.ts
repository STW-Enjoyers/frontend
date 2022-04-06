/***************************************
 * file: registro.component.ts
 * coms: Implements a reactive register form.
 ***************************************/

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../../services/user.service';
import * as RegistroConstants from "./registro.constants";
import {Router} from "@angular/router";
import {FormValidatorService} from "../../services/form-validator.service";
import * as LoginConstants from "../login/login.constants";

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  // Constants
  title:string = RegistroConstants.TITLE;
  usernameLabel:string = RegistroConstants.USERNAME_LABEL;
  usernamePlaceholder:string = RegistroConstants.USERNAME_PLACEHOLDER;
  emailLabel:string = RegistroConstants.EMAIL_LABEL;
  emailPlaceholder:string = RegistroConstants.EMAIL_PLACEHOLDER;
  passwordLabel:string = RegistroConstants.PASSWORD_LABEL;
  passwordPlaceholder:string = RegistroConstants.PASSWORD_PLACEHOLDER;
  confirmPasswordLabel:string = RegistroConstants.CONFIRM_PASSWORD_LABEL;
  confirmPasswordPlaceholder:string = RegistroConstants.PASSWORD_PLACEHOLDER;
  submitButton:string = RegistroConstants.SUBMIT_BUTTON;
  redirectMessage:string = RegistroConstants.REDIRECT_MESSAGE;
  redirectButton: string = RegistroConstants.REDIRECT_BUTTON;
  // Form
  registerForm!: FormGroup;
  // Input error messages
  formErrors = {
    email: undefined,
    username: undefined,
    password: undefined,
    confirmPassword:undefined
  };

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public router: Router,
    private validator: FormValidatorService
  ) {}

  ngOnInit(): void {
    // Init form validators
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.validator.regex.email)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(5)]],
    }, {
      validator: this.validator.matchConfirmItems('password', 'confirmPassword'),
    });
    // Subscribe on value change
    this.registerForm.valueChanges.subscribe(
      value => {
        this.updateValidationErrors()
      }
    );
  }

  // Get errors and update form
  updateValidationErrors() {
    this.formErrors = this.validator.getValidationErrors(this.registerForm, RegistroConstants.VALIDATION_MESSAGES);
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      return;
    }

    this.userService.postUser(this.registerForm.value).subscribe(
      (res) => {

      },
      (err) => {
      }
    );
  }
}
