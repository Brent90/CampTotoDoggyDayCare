import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client:Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    pets: [],
    balanceDue: 0
  };

  disableBalanceDueOnAdd:boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
