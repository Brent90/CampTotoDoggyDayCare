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

  isOtherSelected:boolean = false;

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

}
