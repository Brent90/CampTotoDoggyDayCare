import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _afAuth: AngularFireAuth) { }

  //Documentation used can be found at: https://github.com/angular/angularfire

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(data => resolve(data), err => reject(err))
    });
  }

  getAuth() {
    return this._afAuth.authState.pipe(auth => auth);
  }

  logout() {
    this._afAuth.auth.signOut();
  }

  registerEmployee(email:string, password:string) {
    return new Promise((resolve, reject) => {
      this._afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(data => resolve(data), err => reject(err))
    });
  }

}
