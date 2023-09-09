import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IUser } from 'src/app/interfaces/interface';
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

  register(firstname:string, lastname:string,email:string ,password:string): Observable<IUser> {
    const user = {
      firstname: firstname,
      lastname: lastname,
      email:email,
      password:password
    }
    return this.http.post<IUser>(environment.apiUrl + "/users/register", user)
      .pipe(
        map((user) => {
          localStorage.setItem('user', JSON.stringify(user));
          this.user.next(user);
          return user
        })
      );
  }

  login(email: string | null, password: string | null): Observable<IUser> {
    return this.http.get<IUser>(environment.apiUrl + "/users/login")
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

  // register(user: IUser) {
  //   return this.http.post<IUser>(environment.apiUrl + "/user/register", user);
  // }

}
