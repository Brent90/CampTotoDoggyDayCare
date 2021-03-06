import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from 'src/app/interfaces/client';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { DogApiService } from 'src/app/services/dog-api.service';
import { DogApi } from 'src/app/interfaces/dog-api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pet-profile',
  templateUrl: './pet-profile.component.html',
  styleUrls: ['./pet-profile.component.css']
})
export class PetProfileComponent implements OnInit, OnDestroy {
  client:Client;
  clientPets = [];
  id:string;
  petName:string;
  dogApi:DogApi;
  image:string;
  success:boolean = false;
  clientSubscription: Subscription;
  petSubscription: Subscription;



  constructor(private _route: ActivatedRoute, private _clientService: ClientService, private _dogApiService: DogApiService) { }

  ngOnInit() {
        //grab id from url
        this.id = this._route.snapshot.paramMap.get('id');
        //grab pet name from url
        this.petName = this._route.snapshot.paramMap.get('name');
        //get client using id
        this.clientSubscription = this._clientService.getClient(this.id).subscribe((client) => {
          this.client = client;
          this.clientPets = client.pets;
        });

        this.petSubscription = this._dogApiService.getDogImage().subscribe(data => {
          this.dogApi = data;
          this.image = this.dogApi.message;

          //prevent a null pointer from loading
          if(data.status === "success") {
            this.success = true;
          }
        })
  }

  ngOnDestroy() {
    this.clientSubscription.unsubscribe();
    this.petSubscription.unsubscribe();
  }

}
