import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IUser } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<IUser | null>;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.user = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
  }

  register(firstname: string, lastname: string, email: string, password: string): Observable<IUser> {
    const user = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password
    }
    return this.http.post<IUser>(environment.apiUrl + "/Users/register", user)
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.user.next(user);
          return user
        })
      );
  }

  login(email: string | null, password: string | null): Observable<IUser> {
    const user = {
      email: email,
      password: password
    }
    return this.http.post<IUser>(environment.apiUrl + "/Users/login", user, this.httpOptions)
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



}
