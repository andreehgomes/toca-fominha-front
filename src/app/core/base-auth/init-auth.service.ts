import { Injectable } from '@angular/core';
import { ResponseLogin } from 'src/app/feature/login/shared/model/response-login';

@Injectable({
  providedIn: 'root'
})
export class InitAuthService {

  constructor() { }

  getToken() {
    const login = localStorage.getItem('token');    
    if(!!login){
      console.log('login', JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('token'))))));
      return JSON.parse(decodeURIComponent(escape(window.atob(localStorage.getItem('token')))));
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

}
