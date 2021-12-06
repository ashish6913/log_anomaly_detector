// import { Component, OnInit } from '@angular/core';
// import { AuthService } from 'src/app/core/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {

//   form: any = {
//     username: null,
//     email: null,
//     password: null
//   };
//   isSuccessful = false;
//   isSignUpFailed = false;
//   errorMessage = '';

//   constructor(private authService: AuthService) { }

//   ngOnInit(): void {
//   }

//   onSubmit(): void {
//     const { username, email, password } = this.form;

//     this.authService.register(username, email, password).subscribe(
//       data => {
//         console.log(data);
//         this.isSuccessful = true;
//         this.isSignUpFailed = false;
//       },
//       err => {
//         this.errorMessage = err.error.message;
//         this.isSignUpFailed = true;
//       }
//     );
//   }

// }


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {


  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  
  
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
	email: new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const username =  this.registerForm.controls['username'].value;
    const email =  this.registerForm.controls['email'].value;
	const password =  this.registerForm.controls['password'].value;

    this.authService.register(username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(["/auth/login"]);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}