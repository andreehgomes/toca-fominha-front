import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  constructor(private fireAuth: AngularFireAuth) { }

  getAuthState(){
    return this.fireAuth.authState
  }
}
