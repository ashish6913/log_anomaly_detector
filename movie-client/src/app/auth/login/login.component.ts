import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { TokenStorageService } from 'src/app/core/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string;

  loginForm = new FormGroup({
    // userId: new FormControl('', [Validators.required]),
    username:new FormControl('', [Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
    ) {
      this.roles = "ROLE_USER";
     }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    // const userIdControl = this.loginForm.controls['userId'].value;
    const usernameControl =  this.loginForm.controls['username'].value;
    const passIdControl =  this.loginForm.controls['password'].value;
    // if (userIdControl) {
    //   const userId = userIdControl.value;
    //   if (userId || userId==0) {
    //     //this.authService.login(userIdControl.value);
        
    //   }
    // }
    this.authService.login(usernameControl, passIdControl).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        
        console.log("user role is "+  this.roles);
        this.tokenStorage.authenticated$.next(true);

        if (this.roles == 'ROLE_ADMIN'){
          this.tokenStorage.admin$.next(true);

        }
        else{
          this.tokenStorage.admin$.next(false);
        }

        this.router.navigate(["/"]);
        //this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.tokenStorage.authenticated$.next(false);

      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}
