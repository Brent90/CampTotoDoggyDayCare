import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { timeout } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLoggedIn:boolean;
  isAdmin: boolean;
  loggedInEmployee:string;
  subscription: Subscription;


  constructor(private _authService: AuthService, private _router: Router, private _flashMessages: FlashMessagesService) { }

  ngOnInit() {
        //check if employee is already logged in
        this.subscription = this._authService.getAuth().subscribe(auth => {
          if(auth){
            this.isLoggedIn = true;
            this.loggedInEmployee = auth.email;
            if(this.loggedInEmployee === 'admin@gmail.com') {
              this.isAdmin = true;
            }
          }else{
            this.isLoggedIn = false;
            this.isAdmin = false;
          }
        })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  onLogout() {
    if(confirm('Are You Sure You Want To Logout?')) {
      this._authService.logout();
      this._flashMessages.show('Logout Successful!!',{
      cssClass: 'alert-success', timeout:4000
      });
      this.isAdmin = false;
      this.isLoggedIn = false;
      this._router.navigate(['/login']);
  
      }
  }

}
