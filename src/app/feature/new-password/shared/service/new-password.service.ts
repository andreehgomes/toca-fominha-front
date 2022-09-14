import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PayloadNewPass } from '../model/payload-new-pass';
import { ResponseNewPass } from '../model/response-new-pass';

@Injectable({
  providedIn: 'root'
})
export class NewPasswordService {

  constructor( private http: HttpClient ) { }

  password(payload: PayloadNewPass): Observable<ResponseNewPass>{
    return this.http.post<ResponseNewPass>(`${environment.bff}/nova-senha`, payload);
  }
}
