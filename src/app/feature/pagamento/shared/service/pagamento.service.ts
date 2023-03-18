import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Alert } from 'selenium-webdriver';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { AlertasType } from 'src/app/shared/model/alertas-type.enum';
import { FileUploadModel } from 'src/app/shared/model/file-upload-model';
import { FileService } from 'src/app/shared/service/file/file.service';
import { PaymentModel } from '../model/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  public responseInsertNewPayment = new BehaviorSubject<AlertaModel>(null);
  private path: string = 'payment'

  constructor(
    private angularFireDataBase: AngularFireDatabase,
    private loader: LoaderService,
    private fileService: FileService  ) { }

  insertNewPayment(payment: PaymentModel, file: FileUploadModel): Observable<any>{
    this.loader.openDialog();
    // this.angularFireDataBase.list('payment').push(payment);
    this.fileService.pushFileToStorage(file, this.path, payment).subscribe(
      percentage => {
        console.log('PORCENT: ', Math.round(percentage))
        if(Math.round(percentage) == 100){
          this.loader.closeDialog();
          this.responseInsertNewPayment.next({
            tipo: AlertasType.SUCESSO,
            codigo: '200',
            mensagem: 'Pamento inserido com sucesso!!!'
          })
        }
      },
      error => {
        console.log(error);
      }
    );
    return of('200')
  }
}
