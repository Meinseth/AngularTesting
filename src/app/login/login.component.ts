import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService
  ) {
    if(authSerive.user){
      this.router.navigate(['/home'])
    }
   }

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

  goToRegister() {
    // console.log('register');
    this.router.navigate(['register']);
  }


  onSubmit(): void {
    // console.log('login', this.loginFormGroup.value);
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
          console.log(error)
          if(error.status == 404){
            this.toastr.error("Feil epost eller passord")
          }else if(error.status == 0){
            this.toastr.error("Ingen kontakt med server");
          }

          
        }
      })

    console.warn('Your order has been submitted', this.loginFormGroup.value);
  }

}