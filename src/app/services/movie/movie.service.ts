import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { IMovie, IUser } from 'src/app/interfaces/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movies = new BehaviorSubject<IMovie[]>([]);

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  getUserMovies(UserGuid: string): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(environment.apiUrl + "/Movies/" + UserGuid)
      .pipe(
        map((movies) => {
          this.movies.next(movies)
          return movies;
        })
      );
  }

  addMovie(movie: IMovie): Observable<IMovie> {
    return this.http.post<IMovie>(environment.apiUrl + "/Movies",movie)
      .pipe(
        map((movie) => {
          this.movies.next(this.movies.getValue().concat([movie]));
          return movie;
        })
      );
  }
}
