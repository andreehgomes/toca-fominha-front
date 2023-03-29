import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { Alert } from 'selenium-webdriver';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { AlertasType } from 'src/app/shared/model/alertas-type.enum';
import { FileUploadModel } from 'src/app/shared/model/file-upload-model';
import { FileService } from 'src/app/shared/service/file/file.service';
import { PaymentModel } from '../model/payment.model';

@Injectable({
  providedIn: 'root',
})
export class PagamentoService {
  public responseInsertNewPayment = new BehaviorSubject<AlertaModel>(null);
  private path: string = 'payment';
  private subscription: Subscription;

  constructor(
    private angularFireDataBase: AngularFireDatabase,
    private loader: LoaderService,
    private fileService: FileService
  ) {}

  insertNewPayment(
    payment: PaymentModel,
    file: FileUploadModel
  ): Observable<any> {
    this.loader.openDialog();
    // this.angularFireDataBase.list('payment').push(payment);
    this.fileService.pushFileToStorage(file, this.path, payment).subscribe(
      (percentage) => {
        if (Math.round(percentage) == 100) {
          this.loader.closeDialog();
          this.responseInsertNewPayment.next({
            tipo: AlertasType.SUCESSO,
            codigo: '200',
            mensagem: 'Pagamento inserido com sucesso!!!',
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return of('200');
  }

  getListPayment(): Observable<any> {
    return this.angularFireDataBase
      .list(this.path, (ref) => ref.orderByChild('uid'))
      .snapshotChanges();
  }

  deletePayment(payment: PaymentModel) {
    this.loader.openDialog();
    this.subscription = this.angularFireDataBase
      .list(this.path, (ref) => ref.orderByChild('url').equalTo(payment.url))
      .snapshotChanges()
      .subscribe((pag) => {
        this.fileService.deleteFileStorage(
          pag[0].payload.child('nomeComprovante').val()
        );
        this.angularFireDataBase
          .object(`${this.path}/${pag[0].key}`)
          .remove()
          .catch((error) => {
            throw new Error(
              'Relaxa, por algum motivo seu comprovante nem estava salvo mais.'
            );
          });
        this.subscription.unsubscribe();
        this.loader.closeDialog();
      });
  }
}
