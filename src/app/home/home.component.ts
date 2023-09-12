import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../service/auth/auth.service';
import { IUser } from '../interfaces/interfaces';

@Component({
  standalone:true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports:[
    NavbarComponent
  ]
})
export class HomeComponent implements OnInit {

  user:IUser | null;

  constructor(private authService: AuthService) {
    this.user = this.authService.user.value;
  }

  ngOnInit(): void {

  }

}
