
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Client } from '../interfaces/client';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  //created using documation at:  https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md

  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;


  constructor(private afs: AngularFirestore) { 
    this.clientsCollection = this.afs.collection('clients', ref => ref.orderBy('balanceDue', 'asc'));
  }

  getClients(): Observable<Client[]> {
    //get users with id
    this.clients = this.clientsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Client;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
    return this.clients;
  }

  addNewClient(client: Client) {
    this.clientsCollection.add(client);
  }

 
}
