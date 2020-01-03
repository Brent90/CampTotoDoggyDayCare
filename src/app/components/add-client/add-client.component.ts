import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { of } from 'rxjs';
import { ClientService } from 'src/app/services/client.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  clientForm: FormGroup;
  petArray = [];

  client:Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    pets: [],
    balanceDue: 0
  }; 

  constructor(private _fb: FormBuilder, private _clientService: ClientService, private _router: Router, private _flashMessages: FlashMessagesService) { }

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

  onSubmit() {
    //merge the two pet arrays into one
    this.petArray.push(this.clientForm.get('pets').value);
    this.petArray = this.petArray.concat(this.clientForm.get('additionalPets').value);
    //make a client to be submitted 
    this.client.firstName = this.clientForm.get('firstName').value;
    this.client.lastName = this.clientForm.get('lastName').value;
    this.client.phone = this.clientForm.get('phone').value;
    this.client.email = this.clientForm.get('email').value;
    this.client.pets = this.petArray;

    this._clientService.addNewClient(this.client);

    this._flashMessages.show('New client was added!', {
      cssClass: 'alert-success', timeout: 4000
    });

    this._router.navigate(['/']);
        
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
