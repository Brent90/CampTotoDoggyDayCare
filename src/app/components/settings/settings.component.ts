import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {

  clients: Client[];
  subscription: Subscription;


  constructor(private _clientService: ClientService) { }

  ngOnInit() {
    this.subscription = this._clientService.getClients().subscribe(clientData => {
      this.clients = clientData;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetProjectedProfit() {
    for(let i = 0; i < this.clients.length; i++) {
      this.clients[i].balanceHolder = 0;
      this._clientService.updateClient(this.clients[i]);
    }
  }
}
