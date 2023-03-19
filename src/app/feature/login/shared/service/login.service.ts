import { Injectable } from '@angular/core';
import { PayloadLogin } from '../model/payload-login';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AccountService } from 'src/app/shared/service/account/account.service';
import { ResponseLogin } from '../model/response-login';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { AlertasType } from 'src/app/shared/model/alertas-type.enum';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public behaviorLoginMensagem = new BehaviorSubject<AlertaModel>(null);
  public behaviorUsuarioLogado = new BehaviorSubject<ResponseLogin>(null);
  private pathAccount = '/account';

  constructor(
    private accountService: AccountService,
    private angularFireDataBase: AngularFireDatabase,
    private angularFireAuth: AngularFireAuth,
    private loader: LoaderService
  ) {}

  async signWithEmail(email: string, pass: string) {
    this.loader.openDialog();
    let responseLogin: ResponseLogin = null;
    let mensagemLogin: AlertaModel = new AlertaModel();
    this.angularFireAuth
      .signInWithEmailAndPassword(email, pass)
      .then((login) => {
        this.accountService.getAccountByUidKey(login.user.uid).subscribe(
          (login) => {
            responseLogin = {
              key: login[0].key,
              celular: login[0].payload.child('celular').val(),
              data_nascimento: login[0].payload.child('data_nascimento').val(),
              nome: login[0].payload.child('nome').val(),
              email: login[0].payload.child('email').val(),
              uid: login[0].payload.child('uid').val(),
            };
            this.behaviorUsuarioLogado.next(responseLogin);
            this.behaviorLoginMensagem.next(null);
            this.loader.closeDialog();
          },
          (error) => {
            mensagemLogin = {
              tipo: AlertasType.ERRO,
              codigo: '404',
              mensagem: 'Dados não encontrados',
            };
            this.behaviorLoginMensagem.next(mensagemLogin);
            this.behaviorUsuarioLogado.next(null);
            this.loader.closeDialog();
          }
        );
      })
      .catch((error) => {
        console.log('error: ', error)
        this.behaviorLoginMensagem.next({
          tipo: AlertasType.ERRO,
          codigo: '403',
          mensagem: 'E-mail ou senha incorretos!!',
        });
        this.loader.closeDialog();
      });
  }
}
