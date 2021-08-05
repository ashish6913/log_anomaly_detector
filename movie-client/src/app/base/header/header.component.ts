import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authenticated$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.authenticated$ = authService.authenticated$;
   }

  ngOnInit(): void {
  }

}
