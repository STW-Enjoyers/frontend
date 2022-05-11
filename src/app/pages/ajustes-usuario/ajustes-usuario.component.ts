import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {User} from "../../models/User";
import * as AjustesUsuarioConstants from './ajustes-usuario.constants'
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidatorService} from "../../services/form-validator.service";
import {HttpErrorResponse} from "@angular/common/http";
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

  //User info
  user!: User;
  // Change username form
  changeUsernameForm!: FormGroup;
  // changeUsername form errors
  changeUsernameFormErrors = {
    username: undefined,
  };
  // Server error flags
  userAlreadyExists:boolean = false

  constructor(public userService: UserService,
              private router: Router,
              private fb: FormBuilder,
              private validator: FormValidatorService
  ) {}

  ngOnInit(): void {
    // Get user profile from backend
    this.userService.getProfile().subscribe((user: User) => {
      this.user = user
      console.log(JSON.stringify(this.user.username))

    });

    // Configure changeUsername form validators
    this.changeUsernameForm = this.fb.group({
      // username field cannot be empty
      username: ['', [Validators.required]],
    });

    // Subscribe changeUsername form onValueChange event
    this.changeUsernameForm.valueChanges.subscribe(() => {this.updateChangeUsernameErrors()});

  }

  // Get errors and update form
  updateChangeUsernameErrors() {
    this.changeUsernameFormErrors = this.validator.getValidationErrors(this.changeUsernameForm, AjustesUsuarioConstants.VALIDATION_MESSAGES);
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
      },
      (error) => {
        if (error.status === 404) {
          // username already exists
          this.userAlreadyExists = true
        } else throw new HttpErrorResponse(error) //GlobalErrorHandler will handle it
      }
    );
  }

}
