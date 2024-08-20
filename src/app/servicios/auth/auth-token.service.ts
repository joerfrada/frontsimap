import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
