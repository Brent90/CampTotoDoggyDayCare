import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/interfaces/client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {

  clients:Client[];
  client:Client;
  projectedProfit:number;
  subscription: Subscription;

  constructor(private _clientService: ClientService) { }

  ngOnInit() {
    this.subscription = this._clientService.getClients().subscribe(clientData => {
      this.clients = clientData;
      this.getProjectedProfit();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProjectedProfit() {
    this.projectedProfit = this.clients.reduce((total, client)=> {
      return total + parseFloat(client.balanceHolder.toString());
    }, 0);
  }

  getNote(client:Client){
    this.client = client;
  }

}
