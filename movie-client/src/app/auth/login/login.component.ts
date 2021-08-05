import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm = new FormGroup({
    userId: new FormControl('', [Validators.required]),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const userIdControl = this.loginForm.get('userId');
    if (userIdControl) {
      const userId = userIdControl.value;
      if (userId || userId==0) {
        this.authService.login(userIdControl.value);
        this.router.navigate(["/"]);
      }
    }
  }

}
