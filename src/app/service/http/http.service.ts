import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { ILoginForm } from 'src/app/Interfaces/interface';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  login(email:string | null, password:string | null): Observable<ILoginForm>{
    
    return this.http.post<ILoginForm>(environment.apiUrl + "/login", email + "/" + password)
    .pipe(
        map((loginForm) => {
            return loginForm
        })
    );
  }
}
