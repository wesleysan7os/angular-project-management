import { Injectable } from '@angular/core';
import { User } from './user.model';

@Injectable()
export class AuthService {
  currentUser: User;

  loginUser(userName: string, password: string): void {
    this.currentUser = {
      id: 1,
      userName,
      firstName: 'Wesley',
      lastName: 'Santos'
    };
  }

  updateCurrentUser(firstName: string, lastName: string): void {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}
