/**************************************************
 * file: form.validator.ts
 * coms: Validator for FormGroup form.
 * This code has been modified from tutorial https://morioh.com/p/a78318068011
 *************************************************/

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {stringify} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor() { }

  // regex patterns used in form inputs
  public regex = {
    email: '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}'
  }

  // Return all input error messages
  getValidationErrors(group: FormGroup, validationMessages: Object): any {
    var formErrors = {};

    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      // @ts-ignore
      formErrors[key] = '';
      if (abstractControl && !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)) {

        // @ts-ignore
        const messages = validationMessages[key];
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            // @ts-ignore
            formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        let groupError = this.getValidationErrors(abstractControl, validationMessages);
        formErrors = { ...formErrors, ...groupError }
      }

    });
    return formErrors
  }

  // Validate matching of input and confirm input fiekds
  matchConfirmItems(controlName: string, confirmControlName: string) {
    // @ts-ignore
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const confirmControl = formGroup.controls[confirmControlName];

      if (!control || !confirmControl) {
        return null;
      }

      if (confirmControl.errors && !confirmControl.errors['mismatch']) {
        return null;
      }

      if (control.value !== confirmControl.value) {
        confirmControl.setErrors({ mismatch: true });
      } else {
        confirmControl.setErrors(null);
      }
    }
  }

}
