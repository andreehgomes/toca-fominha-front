import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';
import { AccountService } from 'src/app/shared/service/account/account.service';
import { NewAccount } from './shared/model/new-account';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { DateAdapter } from '@angular/material/core';
import { RouterEnum } from 'src/app/core/router/router.enum';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent implements OnInit {
  route = RouterEnum;

  @ViewChild('formDirective') private formDirective: NgForm;

  hide = true;
  usuario = {
    nome: 'Jogador',
    time: 'Criar nova conta.',
  };

  newAccount: NewAccount = new NewAccount();
  mensagemRespostaCadastro: AlertaModel = new AlertaModel();
  sucesso: boolean = false;
  erro: boolean = false;

  constructor(
    private accountService: AccountService,
    private datePipe: DatePipe
  ) {}

  formControlNewAccount = new FormGroup({
    nome: new FormControl(null, [Validators.required]),
    dataNascimento: new FormControl(null, [Validators.required]),
    novaSenha: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    celular: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
  }

  onSubmit() {
    const { nome, dataNascimento, novaSenha, celular, email } =
      this.formControlNewAccount.controls;

    this.newAccount = {
      nome: nome.value,
      data_nascimento: this.datePipe.transform(
        dataNascimento.value,
        'dd/MM/yyyy'
      ),
      celular: celular.value,
      senha: (novaSenha.value),
      email: email.value,
    };

    this.accountService
      .insertNewAccountEmail(this.newAccount)
      .subscribe((res) => {
        this.accountService.responseInsertNewAccount.subscribe((mensagem) => {
          this.mensagemRespostaCadastro = mensagem;

          if (this.mensagemRespostaCadastro) {
            if (this.mensagemRespostaCadastro.codigo == '200') {
              this.sucesso = true;
              this.erro = false;
            } else if (this.mensagemRespostaCadastro.codigo == '500') {
              this.erro = true;
              this.sucesso = false;
            }
          }
        });
      });

    this.zerarForm();
  }

  zerarForm() {
    this.formControlNewAccount.reset();
    this.formDirective.resetForm();
    for (let control in this.formControlNewAccount.controls) {
      this.formControlNewAccount.controls[control].setErrors(null);
    }
    this.formControlNewAccount = new FormGroup({
      nome: new FormControl(null, [Validators.required]),
      dataNascimento: new FormControl(null, [Validators.required]),
      novaSenha: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      celular: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
    });
  }
}
