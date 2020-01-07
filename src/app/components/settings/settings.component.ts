import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  clients: Client[];

  constructor(private _clientService: ClientService) { }

  ngOnInit() {
    this._clientService.getClients().subscribe(clientData => {
      this.clients = clientData;
    });
  }

  resetProjectedProfit() {
    for(let i = 0; i < this.clients.length; i++) {
      this.clients[i].balanceHolder = 0;
      this._clientService.updateClient(this.clients[i]);
    }
  }
}
