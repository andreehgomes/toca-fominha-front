import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import {} from 'firebase/database';
import { NewAccount } from 'src/app/feature/new-account/shared/model/new-account';
import { map } from 'rxjs/operators';
import { Subscription, of, Observable, BehaviorSubject } from 'rxjs';
import { AlertaModel } from '../../model/alertas-model';
import { AlertasType } from '../../model/alertas-type.enum';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { ResponseLogin } from 'src/app/feature/login/shared/model/response-login';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public responseInsertNewAccount = new BehaviorSubject<AlertaModel>(null);
  pathAccount = 'account';

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireDataBase: AngularFireDatabase,
    private loader: LoaderService
  ) {}

  insertNewAccountEmail(newAccount: NewAccount): Observable<any> {
    this.loader.openDialog();
    console.log(newAccount);
    this.angularFireAuth
      .createUserWithEmailAndPassword(newAccount.email, newAccount.senha)
      .then((user) => {
        newAccount.uid = user.user.uid;
        let newAccountData = {
          celular: newAccount.celular,
          data_nascimento: newAccount.data_nascimento,
          nome: newAccount.nome,
          email: newAccount.email,
          uid: user.user.uid
        }
        this.angularFireDataBase
          .list(this.pathAccount)
          .push(newAccountData)
          .then((account) => {
            this.responseInsertNewAccount.next({
              tipo: AlertasType.SUCESSO,
              codigo: '200',
              mensagem: 'Cadastro realizado com sucesso!!!',
            });
            this.loader.closeDialog();
          })
          .catch((error) => {
            console.log(error);
            this.responseInsertNewAccount.next({
              codigo: error.code,
              mensagem: error.message,
              tipo: AlertasType.ERRO,
            });
            this.loader.closeDialog();
          });
      })
      .catch((error) => {
        console.log(error);
        this.responseInsertNewAccount.next({
          codigo: error.code,
          mensagem: error.message,
          tipo: AlertasType.ERRO,
        });
        this.loader.closeDialog();
      });
    return of('200');
  }

  getAccountByUidKey(celular: string) {
    return this.angularFireDataBase
      .list('/account', (ref) => ref.orderByChild('uid').equalTo(celular))
      .snapshotChanges();
  }

  updateAccount(account: NewAccount, key: string) {
    this.angularFireDataBase.list('account').update(key, account);
  }

  getAllAccount() {
    return this.angularFireDataBase
      .list('account')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((data) => ({
            key: data.payload.key,
            ...data.payload.val,
          }));
        })
      );
  }

  deleteAccount(key: string) {
    this.angularFireDataBase.object(`account/${key}`).remove();
  }
}
