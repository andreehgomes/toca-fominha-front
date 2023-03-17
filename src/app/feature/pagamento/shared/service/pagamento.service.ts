import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Alert } from 'selenium-webdriver';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { AlertasType } from 'src/app/shared/model/alertas-type.enum';
import { PaymentModel } from '../model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  public responseInsertNewPayment = new BehaviorSubject<AlertaModel>(null);

  constructor(
    private angularFireDataBase: AngularFireDatabase,
    private loader: LoaderService
  ) { }

  insertNewPayment(payment: PaymentModel): Observable<any>{
    this.loader.openDialog();
    this.angularFireDataBase.list('payment').push(payment);
    this.responseInsertNewPayment.next({
      tipo: AlertasType.SUCESSO,
      codigo: '200',
      mensagem: 'Pamento inserido com sucesso!!!'
    })
    this.loader.closeDialog();
    return of('200')
  }
}
