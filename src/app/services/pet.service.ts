import { Injectable } from '@angular/core';
import { ClientService } from './client.service';
import { Pet } from '../interfaces/pet';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  pet:Pet = {
    name: '',
    breed: '',
    age: 0,
    birthday: '',
    gender: '',
    reminders: '',
    owner: ''
  }

  constructor(private _clientService: ClientService) { }

  getPetByName(client:Client, petName:string) {
    for(var i = 0; i < client.petInformation.length; i++){
      if(client.petInformation[i] != null && client.petInformation[i].name === petName){
        return  client.petInformation[i];
      }
   }

   return this.pet;
    
  }

  getPetIndex(client:Client, petName:string):number {

    for(var i = 0; i < client.petInformation.length; i++){
       if(client.petInformation[i] != null && client.petInformation[i].name === petName){
         return  i;
       }
    }

    return -1;

 }

}
