import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.authService.currentUser.firstName),
      lastName: new FormControl(this.authService.currentUser.lastName)
    });
  }

  saveProfile(): void {
    this.authService.updateCurrentUser(
      this.profileForm.get('firstName').value,
      this.profileForm.get('lastName').value
    );
    this.router.navigate(['events']);
  }

  cancel(): void {
    this.router.navigate(['events']);
  }
}
