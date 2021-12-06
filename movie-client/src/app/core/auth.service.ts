import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8089/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // public authenticated$ = new BehaviorSubject<boolean>(false);
  // public userId: number;

  // constructor() { 
  //   const _userId = localStorage.getItem("userId");

  //   if (_userId) {
  //     this.userId = parseInt(_userId);
  //     this.authenticated$.next(true);
  //   } else {
  //     this.userId = 0;
  //     this.authenticated$.next(false);
  //   }
  // }

  constructor(private http: HttpClient) { }

  // login(userId:number) {
  //     localStorage.setItem("userId", userId.toString());
  //     this.userId = userId;
  //     this.authenticated$.next(true);
  // }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  // logout() {
  //   localStorage.removeItem("userId");
  //   this.userId = 0;
  //   this.authenticated$.next(false);
  // }
}
