import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/password.validator';
import { EmailValidator } from 'src/app/shared/email.validator';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  employeeRegistrationForm: FormGroup;

  constructor(private _fb: FormBuilder, private _flashMessages: FlashMessagesService, private _router: Router, private _authService: AuthService) { }

  ngOnInit() {
    this.employeeRegistrationForm = this._fb.group({
      email: ['',  [Validators.required, Validators.maxLength(39), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      confirmEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(29)]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: [EmailValidator, PasswordValidator]});
  }

  onSubmit(employee) {
    this._authService.registerEmployee(employee.value.email, employee.value.password);

    this._flashMessages.show('New Employee Added!!', {
      cssClass: 'alert-success', timeout: 4000
    });
    this._router.navigate(['/']);
  }


  //start of getters
  get email() {
    return this.employeeRegistrationForm.get('email');
  }

  get confirmEmail() {
    return this.employeeRegistrationForm.get('confirmEmail');
  }

  get password() {
    return this.employeeRegistrationForm.get('password');
  }

  get confirmPassword(){
    return this.employeeRegistrationForm.get('confirmPassword');
  }
  //end of getters

}
