import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AbstractControl } from '@angular/forms';

@Component({
  templateUrl: './login.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
    `,
  ],
})
export class LoginComponent {
  userName: string;
  password: string;
  mouseoverLogin: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  login(formValues: any): void {
    this.authService.loginUser(formValues.userName, formValues.password);
    this.router.navigate(['/events']);
  }

  cancel(): void {
    this.router.navigate(['/events']);
  }

  showWarningMessage(formControl: AbstractControl): boolean {
    if (formControl && formControl.invalid) {
      return (formControl.touched || this.mouseoverLogin);
    }
    return false;
  }
}
