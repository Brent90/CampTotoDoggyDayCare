import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/interfaces/client';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {

  id: string;
  client: Client;
  clientPets = [];
  halfDayPrice:number = 15;
  fullDayPrice:number = 30;
  otherPrice:number;
  showUpdate:boolean = false;
  isOtherSelected:boolean = false;
  showPaymentForm:boolean = false;
  isAdmin:boolean;
  dailyNoteAdded:boolean = false;
  clientServiceSubscription: Subscription;
  authSubscription: Subscription;
  isInvalidAmount:boolean = false;



  constructor(
    private _clientService: ClientService, 
    private _router: Router,
    private _route: ActivatedRoute,
    private _flashMessages: FlashMessagesService,
    private _authService: AuthService
    ) { }

  ngOnInit() {
    //grab id from url
    this.id = this._route.snapshot.paramMap.get('id');
    //get client using id
    this.clientServiceSubscription = this._clientService.getClient(this.id).subscribe((client) => {
      this.client = client;
      //this.clientPets = client.pets;
    });

    //check if employee is admin, if true then can delete a client
    this.authSubscription = this._authService.getAuth().subscribe(auth => {
      if(auth){
        if(auth.email === 'admin@gmail.com') {
          this.isAdmin = true;
        }
      }
    });
  }

  ngOnDestroy() {
    this.clientServiceSubscription.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  deleteClient() {
    if(confirm('Are you sure you want to delete this client?')){
      this._clientService.deleteClient(this.client);
      this._flashMessages.show('Client was successfully removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.clientPets = [];
      this._router.navigate(['/'])
    }
  }

  showOtherField():void {
    console.log('other')
  }

  onNoteAdd(dailyNote:string){
    console.log(dailyNote);
    this.client.dailyNotes = dailyNote.trim();
    this.client.dailyNotesAdded = true;
    this.dailyNoteAdded = !this.dailyNoteAdded;
    this._clientService.updateClient(this.client);
    this._flashMessages.show('Daily Note Was Added!', {
      cssClass: "alert-success", timeout: 3000
    });
  }


  updateClientBalance(opition:string) {
    const fullName = this.client.firstName + " " + this.client.lastName;
    //close the payment form if it is already open
    this.showPaymentForm = false;

    if(opition === 'halfDay') {
      this.client.balanceDue += this.halfDayPrice;
      this.client.balanceHolder += this.halfDayPrice;
      this.getFlashMessage(fullName, 'Signed Up For A Half Day!!')
    }
    
    if(opition === 'fullDay') {
      this.client.balanceDue += this.fullDayPrice;
      this.client.balanceHolder += this.fullDayPrice;
      this.getFlashMessage(fullName, 'Signed Up For A Full Day!!')
    }

    if(opition === 'other') {
      if(this.otherPrice === null || isNaN(this.otherPrice)) {
        this.otherPrice = 0;
      }else if(this.otherPrice < 0 || this.otherPrice != +this.otherPrice.toFixed(2)){
        this.isInvalidAmount = true;
      }else{
        this.isInvalidAmount = false;
        this.client.balanceDue += this.otherPrice;
        this.client.balanceHolder += this.otherPrice;
        this.isOtherSelected = !this.isOtherSelected;      
        this.getFlashMessage(fullName, 'Signed Up For A Service!!')
        this._clientService.updateClient(this.client);
      }
    }
       
  }

  getFlashMessage(name:string, message:string) {
    this._flashMessages.show(name + " " + message , {
      cssClass: 'alert-success', timeout: 4000
    });
  }


}
