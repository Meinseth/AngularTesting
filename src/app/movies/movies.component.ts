import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { IMovie } from '../interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';
import { MovieService } from '../services/movie/movie.service';

@Component({
  standalone: true,
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  imports:[
    NavbarComponent,
    CommonModule
  ]
})
export class MoviesComponent {

   movies = new BehaviorSubject<IMovie[]>([]);

  constructor(private movieSerivce: MovieService){
    this.movies = this.movieSerivce.movies;
  }

  addMovie(){
    //todo
  }

}
