import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { first } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.scss'],
  imports: [
    ReactiveFormsModule,
    CommonModule
  ]
})
export class RegistrerComponent {
  submitted = false;

  constructor(
    private authSerive: AuthService,
    private router: Router
  ) { }

  registerFormGroup= new FormGroup({
    firstname: new FormControl<string>('',Validators.required),
    lastname: new FormControl<string>('',Validators.required),
    email: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
    repeatpassword: new FormControl<string>('', Validators.required,),
  });

  get email() {
    return this.registerFormGroup.controls.email;
  }

  get password() {
    return this.registerFormGroup.controls.password;
  }

  get firstname() {
    return this.registerFormGroup.controls.firstname;
  }

  get lastname() {
    return this.registerFormGroup.controls.lastname;
  }


  onSubmit(): void {
    this.submitted = true;

    if (this.registerFormGroup.invalid) {
      return;
    }

    this.authSerive.register(this.firstname.value!,this.lastname.value!,this.email.value!,this.password.value!)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate(['home']);
        },
        error: error => {
          console.error(error);
        }
      })

    console.warn('Your order has been submitted', this.registerFormGroup.value);
  }
}
