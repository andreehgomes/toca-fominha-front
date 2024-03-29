import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { NewAccount } from 'src/app/feature/new-account/shared/model/new-account';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { AlertasType } from 'src/app/shared/model/alertas-type.enum';
import { AccountService } from 'src/app/shared/service/account/account.service';
import { environment } from 'src/environments/environment';
import { PayloadNewPass } from '../model/payload-new-pass';
import { ResponseNewPass } from '../model/response-new-pass';

@Injectable({
  providedIn: 'root',
})
export class NewPasswordService {
  behaviorMensagemNewPass: BehaviorSubject<AlertaModel> =
    new BehaviorSubject<AlertaModel>(null);

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private loader: LoaderService
  ) {}

  async newPassword(payload: PayloadNewPass) {
    let updateAccount: NewAccount = new NewAccount();
    let subscriptionGetPhone: Subscription;
    this.loader.openDialog();
    subscriptionGetPhone = this.accountService
      .getAccountByPhoneKey(payload.celular)
      .subscribe((account) => {
        if (account.length != 0) {
          updateAccount = {
            nome: account[0].payload.child("nome").val(),
            celular: account[0].payload.child("celular").val(),
            data_nascimento: account[0].payload.child("data_nascimento").val(),
            senha: btoa(payload.senha)
          }
          if (
            this.checkDataNascimento(
              payload.data_nascimento,
              account[0].payload.child('data_nascimento').val()
            )
          ) {
            this.accountService.updateAccount(updateAccount, account[0].key);
            subscriptionGetPhone.unsubscribe();
            this.behaviorMensagemNewPass.next({
              tipo: AlertasType.SUCESSO,
              codigo: '200',
              mensagem: 'Senha alterada com sucesso.',
            });
            this.loader.closeDialog();
          } else {
            this.behaviorMensagemNewPass.next({
              tipo: AlertasType.ERRO,
              codigo: '404',
              mensagem:
                'Senha não alterada. Número de celular e/ou data de nascimento estão incorretos.',
            });
            this.loader.closeDialog();
          }
        } else {
          this.behaviorMensagemNewPass.next({
            tipo: AlertasType.ERRO,
            codigo: '404',
            mensagem:
              'Senha não alterada. Número de celular e/ou data de nascimento estão incorretos.',
          });
          this.loader.closeDialog();
        }
      });
  }

  checkDataNascimento(dataNascimentoInput: string, dataNascimentoRetorno) {
    return dataNascimentoInput == dataNascimentoRetorno;
  }
}
