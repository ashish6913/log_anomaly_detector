import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { TokenStorageService } from 'src/app/core/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public authenticated$ = new BehaviorSubject<boolean>(false);
  public admin$ = new BehaviorSubject<boolean>(false);

  // public role$ = new BehaviorSubject<boolean>(false);
  // role2$ : Observable<Boolean>;
  //admin$: Observable<boolean>;
   currentUser:any;
  //roles: any;
   //admin : boolean = true;
  //  public authenticated$ = new BehaviorSubject<boolean>(false);
  //  role: any;

  constructor(private authService: AuthService,private token:TokenStorageService) {
    this.authenticated$ = token.authenticated$;
    this.admin$ = token.admin$;
    // console.log(this.authenticated$);
    this.currentUser = this.token.getUser();
   // this.roles = this.token.getUser().roles;
    //this.admin$ = token.admin$;
    // if (this.roles == 'ROLE_ADMIN') {
    //   this.admin = true;
    //   // this.role2$ = this.token.role$.next(true);
    //   // this.authenticated$.next(true);
    //   // console.log(this.authenticated$);
    // }
    // else{
    //   this.roles = 'user'
    //   // this.authenticated$.next(false);
    //   this.admin = false;
    // }
    // console.log("roles are "+this.roles);
    // this.role = this.roles
   }

  ngOnInit(): void {
  }

}
