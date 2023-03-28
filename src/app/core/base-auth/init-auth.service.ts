import { Injectable } from '@angular/core';
import { ResponseLogin } from 'src/app/feature/login/shared/model/response-login';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class InitAuthService {

  constructor(private fireAuth: AngularFireAuth) { }

  getToken() {
    const login = localStorage.getItem('token');    
    if(!!login){
      return JSON.parse(window.atob(localStorage.getItem('token')));
    }
    return;
  }
  getUsuario() {
    const login = localStorage.getItem('usuario');    
    if(!!login){
      return JSON.parse(window.atob(localStorage.getItem('usuario')));
    }
    return;
  }

  getAuth(): any {
    const auth = this.getToken();
    if(!!auth){
      
      return JSON.parse(decodeURIComponent(encodeURIComponent(window.atob(auth['auth']))))
    }
    return;
  }

  logout(){
    this.fireAuth.signOut();
  }

}
