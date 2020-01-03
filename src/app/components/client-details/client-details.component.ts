import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  clientPets = [];
  halfDayPrice:number = 15;
  fullDayPrice:number = 30;
  otherPrice:number;
  showUpdate:boolean = false;
  isOtherSelected:boolean = false;
  showPaymentForm:boolean = false;


  constructor(private _clientService: ClientService, private _router: Router, private _route: ActivatedRoute, private _flashMessages: FlashMessagesService) { }

  ngOnInit() {
    //grab id from url
    this.id = this._route.snapshot.paramMap.get('id');
    //get client using id
    this._clientService.getClient(this.id).subscribe((client) => {
      this.client = client;
      this.clientPets = client.pets;
    });
  }

  deleteUser():void{

  }

  showOtherField():void {
    console.log('other')
  }


  updateClientBalance(opition:string) {
    if(opition === 'halfDay') {
      this.client.balanceDue += this.halfDayPrice;
      this.client.balanceHolder += this.halfDayPrice;
    }
    
    if(opition === 'fullDay') {
      this.client.balanceDue += this.fullDayPrice;
      this.client.balanceHolder += this.fullDayPrice;
    }

    if(opition === 'other') {
      if(this.otherPrice === null || isNaN(this.otherPrice)) {
        this.otherPrice = 0;
      }

      this.client.balanceDue += this.otherPrice;
      this.client.balanceHolder += this.otherPrice;
      this.isOtherSelected = !this.isOtherSelected;      
    }

    this._clientService.updateClient(this.client);
  }


}
