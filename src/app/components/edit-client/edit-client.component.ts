import { Component, OnInit, OnChanges, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit, OnDestroy {

  clientForm: FormGroup;
  petArray = [];
  id:string;

  client:Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    pets: [],
  }; 

  subscription: Subscription;


  constructor(
    private _fb: FormBuilder, 
    private _clientService: ClientService, 
    private _router: Router,
    private _route: ActivatedRoute, 
    private _flashMessages: FlashMessagesService
    ) {}

  ngOnInit() {
        //grab id from url
     this.id = this._route.snapshot.paramMap.get('id');
     
     //get client using id
     this.subscription = this._clientService.getClient(this.id).subscribe((client) => {
       this.client = client;  
       this.loadClientData();
     });

      this.clientForm = this._fb.group({ 
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(29)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(29)]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)]],
      email: ['', [Validators.required, Validators.maxLength(39), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      pets: [[], [Validators.required, Validators.maxLength(29)]],
      additionalPets: this._fb.array([]),
      });

      

  } 

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addAdditionalPet() {
    this.additionalPets.push(this._fb.control(''));
  }

 
  loadClientData() {
      this.clientForm.patchValue({
        firstName: this.client.firstName,
        lastName: this.client.lastName,
        phone: this.client.phone,
        email: this.client.email,
        pets: this.client.pets
      })

    }


    onSubmit() {
      //merge the two pet arrays into one

      this.petArray = this.petArray.concat(this.clientForm.get('additionalPets').value);
      this.petArray = this.petArray.concat(this.client.pets);
      // //make a client to be submitted 
      this.client.firstName = this.clientForm.get('firstName').value;
      this.client.lastName = this.clientForm.get('lastName').value;
      this.client.phone = this.clientForm.get('phone').value;
      this.client.email = this.clientForm.get('email').value;
      this.client.pets = this.petArray;

      for(var x=0; x < this.petArray.length; x++) {
        this.client.petInformation.push({
          name: this.petArray[x],
          breed: "",
          age: 0,
          birthday: "",
          gender: "",
          reminders: "",
          owner: this.client.firstName + " " + this.client.lastName
         });
     
       }
  
      this._clientService.updateClient(this.client);
  
      this._flashMessages.show('Client Was Updated!', {
        cssClass: 'alert-success', timeout: 4000
      });
  
      this._router.navigate(['/client/' + this.client.id]);
          
    }

    removePet(index:number) {
      this.client.pets.splice(index, 1);
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
