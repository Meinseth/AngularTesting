import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpService } from '../service/http/http.service';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports:[
    ReactiveFormsModule
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private httpService:HttpService,
    private router: Router,
    ){}

   loginFormGroup = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
  });

  ngOnInit (): void {
  }

  onSubmit(): void {

    if (this.loginFormGroup.invalid) {
      return;
  }
    
    this.httpService.login(this.loginFormGroup.controls.email.value,this.loginFormGroup.controls.password.value)
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
