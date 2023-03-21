import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';
import { Alert } from 'selenium-webdriver';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { AlertasType } from 'src/app/shared/model/alertas-type.enum';

@Injectable({
  providedIn: 'root',
})
export class RedefirSenhaService {
  constructor(private angularFireAuth: AngularFireAuth) {}

  mensageRedefinirSenha: BehaviorSubject<AlertaModel> = new BehaviorSubject<AlertaModel>(null)

  async redefinirSenha(email: string) {
    this.angularFireAuth.sendPasswordResetEmail(email).then(
      () => {
        this.mensageRedefinirSenha.next({
          tipo: AlertasType.SUCESSO,
          codigo: '200',
          mensagem: 'Confira seu e-mail para redefirnir sua senha.'
        })
      },
      (error) => {
        this.mensageRedefinirSenha.next({
          tipo: AlertasType.ERRO,
          codigo: error.code,
          mensagem: error.message
        })
      }
    );
  }
}
