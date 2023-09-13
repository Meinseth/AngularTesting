import { Component } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { IUser } from '../interfaces/interfaces';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    RouterModule,
    CommonModule
  ]
})
export class NavbarComponent {

  user: IUser | null;
  initials: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.user.value;
    if (this.user) {
      this.initials = this.user?.firstname.charAt(0).toUpperCase() + this.user?.lastname.charAt(0).toUpperCase();
    }
  }

  loggout() {
    localStorage.removeItem('user');
    this.router.navigate(["/login"]);
  }

}
