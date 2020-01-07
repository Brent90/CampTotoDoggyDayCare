import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/password.validator';
import { EmailValidator } from 'src/app/shared/email.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  employeeRegistrationForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.employeeRegistrationForm = this._fb.group({
      email: ['',  [Validators.required, Validators.maxLength(39), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      confirmEmail: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(29)]],
      confirmPassword: ['', [Validators.required]]
    }, {validator: [EmailValidator, PasswordValidator]});
  }

  onSubmit() {
    console.log('logged')
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
