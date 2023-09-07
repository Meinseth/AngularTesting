import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { IUser } from 'src/app/Interfaces/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<IUser> {
    return this.httpClient.get<IUser>(environment.apiUrl + "/Users")
      .pipe(
        map((user) => {
          return user;
        })
      );
  }

  addUser(user: IUser): Observable<IUser> {
    return this.httpClient.post<IUser>(environment.apiUrl + "/Users", user)
      .pipe(
        map((user) => {
          return user;
        })
      );
  }


}
