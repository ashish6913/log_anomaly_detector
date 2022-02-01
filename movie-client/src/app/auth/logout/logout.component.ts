import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/core/auth.service';
import { TokenStorageService } from 'src/app/core/token-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private token: TokenStorageService) { 
    // authService.logout();
    token.signOut();
    console.log('sucessfully logged out');
  }

  ngOnInit(): void {
  }

}
