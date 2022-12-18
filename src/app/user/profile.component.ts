import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './profile.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
      .error ::-moz-placeholder {
        color: #999;
      }
      .error :-moz-placeholder {
        color: #999;
      }
      .error :ms-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}
  profileForm: FormGroup;

  ngOnInit(): void {
    if (!!this.authService.currentUser) {
      this.buildFormModel();
    } else {
      this.router.navigate(['/events']);
    }
  }
  private buildFormModel(): void {
    this.profileForm = this.fb.group({
      firstName: [
        this.authService.currentUser.firstName,
        [Validators.required, Validators.pattern('^[a-zA-z]*$')],
      ],
      lastName: [this.authService.currentUser.lastName, Validators.required],
    });
  }

  saveProfile(): void {
    if (this.profileForm.valid) {
      this.authService.updateCurrentUser(
        this.profileForm.get('firstName').value,
        this.profileForm.get('lastName').value
      );
      this.router.navigate(['events']);
    }
  }

  isFormFieldEmpty(field: string): boolean {
    if (!!this.profileForm.controls[field]) {
      return (
        this.profileForm.controls[field].errors &&
        this.profileForm.controls[field].errors.required &&
        this.profileForm.controls[field].dirty
      );
    }
    return false;
  }

  isFormFieldInvalid(field: string): boolean {
    if (!!this.profileForm.controls[field]) {
      return (
        this.profileForm.controls[field].errors &&
        this.profileForm.controls[field].errors.pattern &&
        this.profileForm.controls[field].dirty
      );
    }
  }

  cancel(): void {
    this.router.navigate(['events']);
  }
}
