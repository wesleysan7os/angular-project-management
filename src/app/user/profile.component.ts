import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './profile.component.html',
  styles: [`
    em { float: right; color: #E05C65; padding-left: 10px; }
    .error input { background-color: #E3C3C5 }
    .error ::-webkit-input-placeholder { color: #999; }
    .error ::-moz-placeholder { color: #999 }
    .error :-moz-placeholder { color: #999 }
    .error :ms-input-placeholder { color: #999 }
  `]
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}
  profileForm: FormGroup;

  ngOnInit(): void {
    if (!!this.authService.currentUser) {
      this.buildFormModel();
    } else {
      this.router.navigate(['/events']);
    }
  }
  private buildFormModel(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl(
        this.authService.currentUser.firstName,
        Validators.required
      ),
      lastName: new FormControl(
        this.authService.currentUser.lastName,
        Validators.required
      ),
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

  isFormFieldInvalid(field: string): boolean {
    if (!!this.profileForm.controls[field]) {
      return (
        this.profileForm.controls[field].invalid &&
        this.profileForm.controls[field].touched
      );
    }
    return false;
  }

  cancel(): void {
    this.router.navigate(['events']);
  }
}
