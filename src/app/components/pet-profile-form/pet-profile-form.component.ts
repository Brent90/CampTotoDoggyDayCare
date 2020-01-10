import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { PetService } from 'src/app/services/pet.service';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/interfaces/client';
import { Pet } from 'src/app/interfaces/pet';
import { FormBuilder, Form, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pet-profile-form',
  templateUrl: './pet-profile-form.component.html',
  styleUrls: ['./pet-profile-form.component.css']
})
export class PetProfileFormComponent implements OnInit, OnDestroy { 
 id:string;
 petName:string;
 petIndex:number;
 subscription: Subscription;
 client:Client;
 clientsPetInformationForm: FormGroup;
 
 pet:Pet = {
   name: '',
   breed: '',
   age: 0,
   birthday: '',
   gender: '',
   reminders: '',
   owner: ''
 }


 constructor(
  private _clientService: ClientService, 
  private _router: Router,
  private _route: ActivatedRoute,
  private _petService: PetService,
  private _fb: FormBuilder,
  private _flashMessages: FlashMessagesService
  ) { }

  ngOnInit() {
      //grab id and name from url
      this.id = this._route.snapshot.paramMap.get('id');
      this.petName = this._route.snapshot.paramMap.get('name');
      
      //get client using id
      this.subscription = this._clientService.getClient(this.id).subscribe((client) => {
          this.client = client;
          this.pet = this._petService.getPetByName(this.client, this.petName);
          this.petIndex = this._petService.getPetIndex(this.client, this.petName);
          this.loadPetData();
      });

      //make form
      this.clientsPetInformationForm = this._fb.group({
        name: [''],
        breed: [''],
        age: [''],
        birthday: [''],
        gender: [''],
        reminders: [''],
        owner: ['']
      })
      
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadPetData(){
    this.clientsPetInformationForm.patchValue({
      name: this.client.petInformation[this.petIndex].name,
      breed: this.client.petInformation[this.petIndex].breed,
      age: this.client.petInformation[this.petIndex].age,
      birthday: this.client.petInformation[this.petIndex].birthday,
      gender: this.client.petInformation[this.petIndex].gender,
      reminders: this.client.petInformation[this.petIndex].reminders,
      // owner: this.client.petInformation[this.petIndex].owner
      owner: this.client.firstName + " " + this.client.lastName
    })
    
  }
  
  onSubmit(clientsPetInformationForm) {
      this.pet = clientsPetInformationForm.value;
      this.client.petInformation[this.petIndex] = this.pet;
      this._clientService.updateClient(this.client);

      
      this._flashMessages.show('Pet Information Was Updated!', {
        cssClass: 'alert-success', timeout: 4000
      });
  
  }


  get name() {
    return this.clientsPetInformationForm.get('name');
  }

  get breed() {
    return this.clientsPetInformationForm.get('breed');
  }

  get age() {
    return this.clientsPetInformationForm.get('age');
  }

  get birthday() {
    return this.clientsPetInformationForm.get('birthday');
  }

  get gender() {
    return this.clientsPetInformationForm.get('gender');
  }

  get reminders() {
    return this.clientsPetInformationForm.get('reminders');
  }

  get owner() { 
    return this.clientsPetInformationForm.get('owner');  
  }


}
