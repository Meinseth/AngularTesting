import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {  IUser } from 'src/app/Interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: BehaviorSubject<IUser | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
  }

  login(email: string | null, password: string | null): Observable<IUser> {
    return this.http.post<IUser>(environment.apiUrl + "user/login", email + "/" + password)
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.user.next(user);
          return user
        })
      );
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['/account/login']);
  }

  register(user: IUser) {
    return this.http.post<IUser>(environment.apiUrl + "/user/register", user);
}

}
