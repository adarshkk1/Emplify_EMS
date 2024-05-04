import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
  admin="admin@gmail.com";
  constructor() {

    const user = this.getUser();
    if (user) {
      this.setUser(user);
    }
  }

  setUser(user: any) {
    this.user = user;
    sessionStorage.setItem('regUser', JSON.stringify(user));
  }

  getUser() {
    const localUser = sessionStorage.getItem('regUser');
    this.user = localUser ? JSON.parse(localUser) : null;

    return this.user;
  }
}
