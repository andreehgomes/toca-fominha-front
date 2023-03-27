import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { AlertasType } from 'src/app/shared/model/alertas-type.enum';
import { LocalTreino } from 'src/app/shared/model/local-treino';

@Injectable({
  providedIn: 'root',
})
export class NewLocalTreinoService {
  behaviorMensagemNewLocal: BehaviorSubject<AlertaModel> =
    new BehaviorSubject<AlertaModel>(null);
  behaviorLocalTreino: BehaviorSubject<Array<LocalTreino>> =
    new BehaviorSubject<Array<LocalTreino>>(null);

  private path: string = 'local_treino';

  constructor(
    private angularFireDataBase: AngularFireDatabase,
    private loader: LoaderService
  ) {}

  async insertNewLocal(local: LocalTreino) {
    this.loader.openDialog();
    this.angularFireDataBase
      .list(this.path)
      .push(local)
      .then((local) => {
        this.behaviorMensagemNewLocal.next({
          codigo: '200',
          tipo: AlertasType.SUCESSO,
          mensagem: 'Feito',
        });
        this.loader.closeDialog();
      })
      .catch((error) => {
        this.behaviorMensagemNewLocal.next({
          codigo: '500',
          tipo: AlertasType.ERRO,
          mensagem: 'Opa, deu ruim, tente novamente mais tarde!',
        });
        this.loader.closeDialog();
      });
  }

  getListaLocalTreino(): Observable<any> {
    return this.angularFireDataBase
      .list(this.path, (res) => res.orderByChild('nome'))
      .snapshotChanges();
  }
}
