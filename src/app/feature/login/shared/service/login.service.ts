import { Injectable } from '@angular/core';
import { PayloadLogin } from '../model/payload-login';
import { BehaviorSubject } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AccountService } from 'src/app/shared/service/account/account.service';
import { ResponseLogin } from '../model/response-login';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { AlertasType } from 'src/app/shared/model/alertas-type.enum';
import { LoaderService } from 'src/app/components/loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public behaviorLoginMensagem = new BehaviorSubject<AlertaModel>(null);
  public behaviorUsuarioLogado = new BehaviorSubject<ResponseLogin>(null);

  constructor(
    private accountService: AccountService,
    private angularFireDataBase: AngularFireDatabase,
    private loader: LoaderService
  ) {}

  async autenticar(payload: PayloadLogin) {
    this.loader.openDialog();
    let responseLogin: ResponseLogin = null;
    let mensagemLogin: AlertaModel = new AlertaModel();

    this.accountService
      .getAccountByPhoneKey(payload.celular)
      .subscribe((login) => {
        if (login.length != 0) {
          if (this.checkPass(payload.senha, login[0].payload.child("senha").val())) {
            responseLogin = {
              key: login[0].key,
              celular: login[0].payload.child("celular").val(),
              data_nascimento: login[0].payload.child("data_nascimento").val(),
              nome: login[0].payload.child("nome").val(),
              senha: login[0].payload.child("senha").val(),
            };
            console.log(responseLogin);
            this.behaviorUsuarioLogado.next(responseLogin);
            this.behaviorLoginMensagem.next(null);
            this.loader.closeDialog();
          } else {
            mensagemLogin = {
              tipo: AlertasType.ERRO,
              codigo: '401',
              mensagem: 'Usuário ou senha incorretos.',
            };
            this.behaviorLoginMensagem.next(mensagemLogin);
            this.behaviorUsuarioLogado.next(null);
            this.loader.closeDialog();
          }
        } else {
          mensagemLogin = {
            tipo: AlertasType.ERRO,
            codigo: '401',
            mensagem: 'Usuário ou senha incorretos.',
          };
          this.behaviorLoginMensagem.next(mensagemLogin);
          this.loader.closeDialog();
        }
      });
  }

  getAccountByPhone(payload: PayloadLogin) {
    return this.angularFireDataBase
      .list('/account', (ref) =>
        ref.orderByChild('celular').equalTo(payload.celular)
      )
      .valueChanges();
  }

  checkPass(passInput: string, passReturn: string): boolean {
    // console.log("passInput: ", passInput);
    // console.log("passReturn: ", atob(passReturn));
    return passInput == atob(passReturn);
  }
}
