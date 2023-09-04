import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../service/http/http.service';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth/auth.service';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class LoginComponent implements OnInit {
  submitted = false;

  constructor(
    private authSerive: AuthService,
    private router: Router,
  ) { }

  loginFormGroup = new FormGroup({
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });

  ngOnInit(): void {
  }

  get email() {
    return this.loginFormGroup.controls.email;
  }

  get password() { 
    return this.loginFormGroup.controls.password; 
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginFormGroup.invalid) {
      return;
    }

    this.authSerive.login(this.loginFormGroup.controls.email.value, this.loginFormGroup.controls.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['home']);
        },
        error: error => {
          console.error(error);
        }
      })

    console.warn('Your order has been submitted', this.loginFormGroup.value);
  }

}
