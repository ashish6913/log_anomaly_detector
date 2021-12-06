import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLE_KEY = 'auth-role';


@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  public authenticated$ = new BehaviorSubject<boolean>(false);
  public admin$ = new BehaviorSubject<boolean>(false);


  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
    this.authenticated$.next(false);
    this.admin$.next(false);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public saveUserRole(role: any): void {
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(role));
  }
  public getUserRole(): string | null {
    return window.sessionStorage.getItem(ROLE_KEY);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      this.authenticated$.next(true);
      return JSON.parse(user);
      
    }

    return {};
  }
}
