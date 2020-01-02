import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  disableBalanceDueOnAdd:boolean = true;
  clientForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.clientForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(29)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(29)]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
      email: ['', [Validators.required, Validators.maxLength(39), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      pets: ['', [Validators.required, Validators.maxLength(29)]],
      additionalPets: this._fb.array([])
    });
  }

  addAdditionalPet() {
    this.additionalPets.push(this._fb.control(''));
  }

  // start of getters 

  get firstName() {
    return this.clientForm.get('firstName');
  }

  get lastName() {
    return this.clientForm.get('lastName');
  }

  get phone() {
    return this.clientForm.get('phone');
  }

  get email() {
    return this.clientForm.get('email');
  }

  get pets() {
    return this.clientForm.get('pets');
  }

  get additionalPets() {
    return this.clientForm.get('additionalPets') as FormArray;
  }

  // end of getters

}
