import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PayloadLogin } from '../model/payload-login';
import { Observable } from 'rxjs';
import { ResponseLogin } from '../model/response-login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  autenticar(payload: PayloadLogin): Observable<PayloadLogin>{
    return this.http.post<PayloadLogin>(`${environment.bff}/autenticar`, payload);
  }
}
