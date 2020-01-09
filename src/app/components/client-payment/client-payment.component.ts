import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/interfaces/client';

@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.css']
})
export class ClientPaymentComponent implements OnInit, OnDestroy  {

  @Input() parentData;
  amountGiven:number;
  changeDue:number;
  invalidAmount:boolean = false;

  //new code to try to fix 'ERROR FirebaseError: Missing or insufficient permissions' 
  // id:string;
  // subscription: Subscription;
  // client:Client = {
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   email: '',
  //   pets: [],
  //   balanceDue: 0
  // }; 


  constructor(private _clientService: ClientService, private _route: ActivatedRoute) { }

  ngOnInit() {
    // //grab id from url
    //   this.id = this._route.snapshot.paramMap.get('id');
    // //get client using id
    //   this.subscription = this._clientService.getClient(this.id).subscribe((client) => {
    //     this.client = client;  
    //   });
  }

  ngOnDestroy() {
      // this.subscription.unsubscribe();
  }

  calculateChange() {
    if(isNaN(this.amountGiven) || this.amountGiven === null){
      this.amountGiven = 0;
    }
    
    if( this.amountGiven < this.parentData.balanceDue) {
      this.invalidAmount = true;
    } else{
      this.invalidAmount = false;
      this.changeDue = (this.amountGiven - this.parentData.balanceDue);
      this.parentData.balanceDue = 0;
      //remove daily notes for client
      this.parentData.dailyNotes = "";
      this.parentData.dailyNotesAdded = false;
      //update
      this._clientService.updateClient(this.parentData);
    }

    
  }

  // calculateChange() {
  //   if(isNaN(this.amountGiven) || this.amountGiven === null){
  //     this.amountGiven = 0;
  //   }
    
  //   if( this.amountGiven < this.client.balanceDue) {
  //     this.invalidAmount = true;
  //   } else{
  //     this.invalidAmount = false;
  //     this.changeDue = (this.amountGiven - this.client.balanceDue);
  //     this.client.balanceDue = 0;
  //     this._clientService.updateClient(this.client);
  //   }
  // }

}
