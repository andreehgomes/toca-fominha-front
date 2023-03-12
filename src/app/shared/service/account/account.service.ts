import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/database';
import {} from 'firebase/database';
import { NewAccount } from 'src/app/feature/new-account/shared/model/new-account';
import { map } from 'rxjs/operators';
import { Subscription, of, Observable, BehaviorSubject } from 'rxjs';
import { AlertaModel } from '../../model/alertas-model';
import { AlertasType } from '../../model/alertas-type.enum';
import { LoaderService } from 'src/app/components/loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  public responseInsertNewAccount = new BehaviorSubject<AlertaModel>(null);

  constructor(
    private angularFireDataBase: AngularFireDatabase,
    private loader: LoaderService
  ) {}

  insertNewAccount(newAccount: NewAccount): Observable<any> {
    this.loader.openDialog();
    let subscription: Subscription;
    let findPhone;

    subscription = this.getAccountByPhone(newAccount.celular).subscribe(
      (res) => {
        findPhone = res;
        if (findPhone.length == 0) {
          this.angularFireDataBase.list('account').push(newAccount);
          this.responseInsertNewAccount.next({
            tipo: AlertasType.SUCESSO,
            codigo: '200',
            mensagem: 'Cadastro realizado com sucesso!!!',
          });
          subscription.unsubscribe();
          this.loader.closeDialog();
        } else {
          this.responseInsertNewAccount.next({
            tipo: AlertasType.ERRO,
            codigo: '500',
            mensagem: 'Esse celular já está sendo usado por outro jogador!!!',
          });
          this.loader.closeDialog();
        }
      }
    );
    return of('200');
  }

  getAccountByPhone(celular: string) {
    return this.angularFireDataBase
      .list('/account', (ref) => ref.orderByChild('celular').equalTo(celular))
      .valueChanges();
  }

  getAccountByPhoneKey(celular: string) {
    return this.angularFireDataBase
      .list('/account', (ref) => ref.orderByChild('celular').equalTo(celular))
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
