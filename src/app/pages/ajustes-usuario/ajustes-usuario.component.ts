import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {User} from "../../models/User";
import * as AjustesUsuarioConstants from './ajustes-usuario.constants'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidatorService} from "../../services/form-validator.service";
import {HttpErrorResponse} from "@angular/common/http";
import {PASSWORD_VALIDATION_MESSAGES} from "./ajustes-usuario.constants";
@Component({
  selector: 'app-ajustes-usuario',
  templateUrl: './ajustes-usuario.component.html',
  styleUrls: ['./ajustes-usuario.component.css']
})
export class AjustesUsuarioComponent implements OnInit {
  // Constants
  title:string = AjustesUsuarioConstants.TITLE;
  usernameLabel:string = AjustesUsuarioConstants.USERNAME_LABEL
  emailLabel:string = AjustesUsuarioConstants.EMAIL_LABEL
  actualPasswordLabel:string = AjustesUsuarioConstants.ACTUAL_PASSWORD_LABEL
  newPasswordLabel:string = AjustesUsuarioConstants.NEW_PASSWORD_LABEL
  passwordError:string = AjustesUsuarioConstants.PASSWORD_ERROR
  usernameError:string = AjustesUsuarioConstants.USERNAME_ERROR
  usernameSuccess:string = AjustesUsuarioConstants.USERNAME_SUCCESS
  passwordSuccess:string = AjustesUsuarioConstants.PASSWORD_SUCCESS
  //User info
  user!: User;
  // Change username form
  changeUsernameForm!: FormGroup;
  // Change username form
  changePasswordForm!: FormGroup;
  // changeUsername form errors
  changeUsernameFormErrors = {
    username: undefined,
  };
  changePasswordFormErrors = {
    actualPassword: undefined,
    newPassword: undefined,
  }
  // Server error flags
  userAlreadyExists:boolean = false
  actualPasswordIncorrect:boolean = false
  // Success flags
  passwordUpdated:boolean = false
  usernameUpdated:boolean = false
  // Password inputs visibility
  actualPasswordShow:boolean = false
  newPasswordShow:boolean = false

  constructor(public userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private validator: FormValidatorService
  ) {}

  ngOnInit(): void {
    // Get user profile from backend
    this.userService.getProfile().subscribe((user: User) => {
      this.user = user
    });

    // Configure changeUsername form validators
    this.changeUsernameForm = this.fb.group({
      // username field cannot be empty
      username: ['', [Validators.required]],
    });
    // Configure changePassword form validators
    this.changePasswordForm = this.fb.group({
      // username field cannot be empty
      actualPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(5)]]
    });

    // Subscribe changeUsername form onValueChange event
    this.changeUsernameForm.valueChanges.subscribe(() => {this.updateChangeUsernameErrors()});
    // Subscribe changePassword form onValueChange event
    this.changePasswordForm.valueChanges.subscribe(() => {this.updateChangePasswordErrors()});

  }

  // Get errors and update form
  updateChangeUsernameErrors() {
    this.changeUsernameFormErrors = this.validator.getValidationErrors(this.changeUsernameForm, AjustesUsuarioConstants.VALIDATION_MESSAGES);
  }

  // Get errors and update form
  updateChangePasswordErrors() {
    this.changePasswordFormErrors = this.validator.getValidationErrors(this.changePasswordForm, AjustesUsuarioConstants.PASSWORD_VALIDATION_MESSAGES);
  }

  onChangeUsernameSubmit() {
    // Check errors
    if (!this.changeUsernameForm.valid) {
      this.updateChangeUsernameErrors();
      return;
    }

    // Submit action
    this.userService.changeUsername(this.changeUsernameForm.value.username).subscribe(
      (res: any) => {
        this.userAlreadyExists = false
        this.user.username = this.changeUsernameForm.value.username
        this.usernameUpdated = true
        window.location.reload(); //Refresh to update header
        //wait 5 Seconds and hide
        setTimeout(() => {
          this.usernameUpdated = false;
        },5000);
      },
      (error) => {
        if (error.status === 404) {
          // username already exists
          this.userAlreadyExists = true
        } else throw new HttpErrorResponse(error) //GlobalErrorHandler will handle it
      }
    );
  }

  onChangePasswordSubmit() {
    // Check errors
    if (!this.changePasswordForm.valid) {
      this.updateChangePasswordErrors();
      return;
    }

    // Submit action
    this.userService.changePassword(this.user.email, this.changePasswordForm.value.actualPassword, this.changePasswordForm.value.newPassword).subscribe(
      (res: any) => {
        this.actualPasswordIncorrect = false
        this.passwordUpdated = true
        //wait 5 Seconds and hide
        setTimeout(() => {
          this.passwordUpdated = false;
        }, 5000);
      },
      (error) => {
        if (error.status === 404) {
          // username already exists
          this.actualPasswordIncorrect = true
        } else throw new HttpErrorResponse(error) //GlobalErrorHandler will handle it
      }
    );
  }

  onClickActualPasswordVisibility() {
    this.actualPasswordShow = !this.actualPasswordShow
  }
  onClickNewPasswordVisibility() {
    this.newPasswordShow = !this.newPasswordShow
  }

}
