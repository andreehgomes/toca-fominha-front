import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipe } from '../model/equipe-model';
import { Horario } from '../model/horario-model';

@Injectable({
  providedIn: 'root'
})
export class HorariosService {

  constructor(private http: HttpClient) { }

  // getHorarios(equipe: Equipe): Observable<Horario[]>{
  //   return this.http.get<Horario[]>(`${environment.bff}/horarios`);
  // }
}
