import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

import * as jdecode from 'jwt-decode';
import { User, DefaultService } from 'src/app/api';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly STORAGE_KEY = 'PT3-TK';

  token: string;

  user: string;

  constructor(private service: DefaultService) {
    this.token = this.getTokenFromStorage();
    if (this.token) {
      const decoded = jdecode(this.token);
      this.user = decoded.iss;
    }
  }

  login(user: string, password: string): Observable<User> {
    return this.service.login({ user, password })
      .pipe(tap(r => this.setTokenToStorage(r.token)));
  }

  logout(): Observable<any> {
    return this.service.logout()
      .pipe(tap(r => this.removeTokenFromStorage()));
  }

  private setTokenToStorage(token: string) {
    localStorage.setItem(this.STORAGE_KEY, token);
    this.token = token;
    this.user = jdecode(token).iss;
  }

  private removeTokenFromStorage() {
    localStorage.removeItem(this.STORAGE_KEY);
    this.token = null;
    this.user = null;
  }

  private getTokenFromStorage(): string {
    return localStorage.getItem(this.STORAGE_KEY);
  }
}
