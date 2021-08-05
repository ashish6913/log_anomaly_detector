import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticated$ = new BehaviorSubject<boolean>(false);
  public userId: number;

  constructor() { 
    const _userId = localStorage.getItem("userId");

    if (_userId) {
      this.userId = parseInt(_userId);
      this.authenticated$.next(true);
    } else {
      this.userId = 0;
      this.authenticated$.next(false);
    }
  }

  login(userId:number) {
      localStorage.setItem("userId", userId.toString());
      this.userId = userId;
      this.authenticated$.next(true);
  }

  logout() {
    localStorage.removeItem("userId");
    this.userId = 0;
    this.authenticated$.next(false);
  }
}
