import { Component, OnInit, Input } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-payment',
  templateUrl: './client-payment.component.html',
  styleUrls: ['./client-payment.component.css']
})
export class ClientPaymentComponent implements OnInit {

  @Input() parentData;
  amountGiven:number;
  changeDue:number;
  invalidAmount:boolean = false;

  constructor(private _clientService: ClientService) { }

  ngOnInit() {
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
      this._clientService.updateClient(this.parentData);
    }
  }

}
