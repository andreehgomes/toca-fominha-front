import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { RouterEnum } from 'src/app/core/router/router.enum';
import { RouterService } from 'src/app/core/router/router.service';
import { AlertaModel } from 'src/app/shared/model/alertas-model';
import { AccountService } from 'src/app/shared/service/account/account.service';
import { PayloadNewPass } from './shared/model/payload-new-pass';
import { NewPasswordService } from './shared/service/new-password.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss'],
})
export class NewPasswordComponent implements OnInit {
  @ViewChild('formDirective') private formDirective: NgForm;

  route = RouterEnum;
  hide = true;
  usuario = {
    nome: 'Jogador',
    time: 'Alterar senha de acesso.',
  };
  mensagemNewPass: AlertaModel;

  constructor(
    private newPassService: NewPasswordService,
    
  ) {}

  formControlNewPass = new FormGroup({
    novaSenha: new FormControl(null, [Validators.required, Validators.minLength(6)]),
  });

  ngOnInit(): void {}

  onSubmit() {
    const { novaSenha } = this.formControlNewPass.controls;
    this.newPassService.changePass(novaSenha.value).then(() => {
      this.newPassService.behaviorMensagemNewPass.subscribe((mensagem) => {
        this.mensagemNewPass = mensagem;
        localStorage.removeItem('token');
      });
    });
  }

  zerarForm() {
    this.formControlNewPass.reset();
    this.formDirective.resetForm();
    for (let control in this.formControlNewPass.controls) {
      this.formControlNewPass.controls[control].setErrors(null);
    }
    this.formControlNewPass = new FormGroup({
      novaSenha: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
}
