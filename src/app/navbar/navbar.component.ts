import { Component } from '@angular/core';
import { AuthService } from '../service/auth/auth.service';
import { IUser } from '../interfaces/interfaces';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  user: IUser | null;
  initials: string = "";

  constructor(private authService: AuthService) {
    this.user = this.authService.user.value;
  }

}
