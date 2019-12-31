import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients:Client[];

  constructor(private _clientService: ClientService) { }

  ngOnInit() {
    this._clientService.getClients().subscribe(clientData => {
      console.log(clientData);
    });

    console.log('hi');

  }

}
