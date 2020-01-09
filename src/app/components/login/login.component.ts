import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  email:string;
  password:string;
  subscription: Subscription;

  
  constructor(private _authService: AuthService, private _flashMessages: FlashMessagesService, private _router: Router) { }

  ngOnInit() {
    //check if employee is already logged in
    this.subscription = this._authService.getAuth().subscribe(auth => {
      if(auth){
        this._router.navigate(['/']);
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this._authService.login(this.email, this.password).then(res => {
      this._flashMessages.show('Login Successful!!', {
        cssClass: 'alert-success', timeout: 4000
      });
      this._router.navigate(['/']);
    })
    .catch(err => {
      this._flashMessages.show(err.message, {
        cssClass: 'alert-danger', timeout: 5000
      });
    });
  }


}
