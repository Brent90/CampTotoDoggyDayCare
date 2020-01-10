import { Component, OnInit } from '@angular/core';
import { ClientService } from './services/client.service';
import { Pet } from './interfaces/pet';
import { Subscription } from 'rxjs';
import { PetService } from './services/pet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CampTotoDoggyDayCare';
  
  constructor() {
  }

  ngOnInit() {
  
  }
}
