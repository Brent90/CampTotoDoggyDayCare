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
  projectedProfit:number;

  constructor(private _clientService: ClientService) { }

  ngOnInit() {
    this._clientService.getClients().subscribe(clientData => {
      this.clients = clientData;
      this.getProjectedProfit();
    });
  }

  getProjectedProfit() {
    this.projectedProfit = this.clients.reduce((total, client)=> {
      return total + parseFloat(client.balanceHolder.toString());
    }, 0);
  }

}
